/* Template prompt-vs-1x1 — Prompt vs Agent Opus 1:1 (prompt card left, result phone card right, square) */
(function () {
  function Component(props) {
    const { useState } = React;

    const [vids, setVids] = useState(() => (props && props.preload && props.preload.vids) || {});
    React.useEffect(() => { window.__slotAPI = { setVids }; return () => { window.__slotAPI = null; }; }, []);
    const [labelText, setLabelText] = useState(() => (props && props.preload && props.preload.labelText) || {});
    React.useEffect(() => { if (window.__slotAPI) window.__slotAPI.setLabelText = setLabelText; }, []);
    React.useEffect(() => { if (window.__slotAPI) window.__slotAPI.labelText = labelText; }, [labelText]);
    const pick = k => { const i=document.createElement('input'); i.type='file'; i.accept='video/*,image/*'; i.onchange=e=>{const f=e.target.files[0]; if(f) setVids(v=>({...v,[k]:{url:URL.createObjectURL(f),img:(f.type||"").startsWith("image")}}));}; i.style.cssText='position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0'; document.body.appendChild(i); i.addEventListener('change',function(){setTimeout(function(){i.remove();},0);},{once:true}); i.click(); };
    const Slot = ({ k, className, style }) => (
      <div data-vslot={k} onClick={() => pick(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={style}>
        {vids[k] ? (vids[k].img ? <img src={vids[k].url} className="w-full h-full object-cover" /> : <video src={vids[k].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />)
        : null}
      </div>
    );

    // the prompt scrolls in sync with the result video's playback
    const [scrollSpeed, setScrollSpeed] = useState(() => (props && props.preload && props.preload.scrollSpeed) || 1);
    const speedRef = React.useRef(1);
    speedRef.current = scrollSpeed;
    React.useEffect(() => { if (window.__slotAPI) { window.__slotAPI.setScrollSpeed = (v) => { window.__slotAPI.scrollSpeed = v; setScrollSpeed(v); }; window.__slotAPI.scrollSpeed = scrollSpeed; } }, []);
    React.useEffect(() => { if (window.__slotAPI) window.__slotAPI.scrollSpeed = scrollSpeed; }, [scrollSpeed]);
    const boxRef = React.useRef(null);
    React.useEffect(() => {
      let raf;
      const tick = () => {
        const box = boxRef.current;
        if (box) {
          const frame = box.closest("[data-promptvs]");
          const v = frame && frame.querySelector('[data-vslot="slot1"] video');
          const inner = box.firstElementChild;
          if (inner) {
            const over = inner.scrollHeight - box.clientHeight;
            if (over > 0) { const prog = window.__scrollProg ? window.__scrollProg(v) : (v && v.duration ? Math.min(1, (v.currentTime || 0) / v.duration) : 0); inner.style.transform = "translateY(-" + (prog * over).toFixed(2) + "px)"; }
            else inner.style.transform = "";
          }
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, []);

    const PROMPT_TEXT = "A cinematic product ad. Slow-motion splash, studio lighting, ultra-detailed 4K. Camera slowly approaches, the scene quiet, almost too still. Main character steps into frame. Tight, low angle. No expression. Just breath.";

    const pillBg = { backgroundImage: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6))" };

    return (
      <div data-promptvs className="relative overflow-hidden bg-[#181818]" style={{ width: 1080, height: 1080 }}>
        <div className="hidden" />

        {/* Prompt card (dark, left) */}
        <div className="absolute rounded-[24px] bg-[#232327]" style={{ left: 100, top: 160, width: 400, height: 760 }}>
          <div data-pin data-swap="label1" className="absolute flex items-center justify-center px-[16px] py-[9px] rounded-[13px]" style={{ left: 18, top: 18, ...pillBg }}>
            {labelText.label1 === "@logo"
              ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[34px] object-contain" />
              : <p className="font-medium leading-none text-[24px] text-center text-white tracking-[0.7px] uppercase whitespace-nowrap font-[Geist,sans-serif]">{(labelText.label1 && labelText.label1 !== "@logo") ? labelText.label1 : "prompt"}</p>}
          </div>
          <div ref={boxRef} data-scrolltext className="absolute overflow-hidden" style={{ left: 26, right: 26, top: 84, bottom: 28 }}>
            <p className="text-[#c8c8ce] text-[22px] leading-[1.55] font-normal font-[Geist,sans-serif]">{PROMPT_TEXT}</p>
          </div>
        </div>

        {/* Agent opus card (video, right) */}
        <div className="absolute rounded-[24px]" style={{ left: 552, top: 160, width: 428, height: 760 }}>
          <Slot k="slot1" className="absolute inset-0 rounded-[24px] bg-white" />
          <div data-pin data-swap="label2" className="absolute flex items-center justify-center px-[18px] py-[10px] rounded-[14px]" style={{ left: 18, top: 18, ...pillBg }}>
            {(labelText.label2 === "@logo" || labelText.label2 == null)
              ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[34px] object-contain" />
              : <p className="font-medium leading-none text-[24px] text-center text-white tracking-[0.7px] uppercase whitespace-nowrap font-[Geist,sans-serif]">{labelText.label2 || "AGENT OPUS"}</p>}
          </div>
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({ id: "prompt-vs-1x1", name: "Prompt vs Agent Opus 1:1", width: 1080, height: 1080, slots: 1, desc: "Square dual-card layout: the prompt on the left card, the Agent Opus result on the right. The prompt scrolls with playback.", Component });
})();
