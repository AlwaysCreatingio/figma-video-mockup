/* Template prompt-duo-16x9 — Prompt + Video 16:9 */
(function () {
  function Component(props) {
    const { useState } = React;

    const [vids, setVids] = useState(() => (props && props.preload && props.preload.vids) || {});
    React.useEffect(() => { window.__slotAPI = { setVids }; return () => { window.__slotAPI = null; }; }, []);
    const [labelText, setLabelText] = useState(() => (props && props.preload && props.preload.labelText) || {});
    React.useEffect(() => { if (window.__slotAPI) window.__slotAPI.setLabelText = setLabelText; }, []);
    React.useEffect(() => { if (window.__slotAPI) window.__slotAPI.labelText = labelText; }, [labelText]);
    const pick = k => {
      const i = document.createElement('input');
      i.type = 'file';
      i.accept = 'video/*,image/*';
      i.onchange = e => { const f = e.target.files[0]; if (f) setVids(v => ({ ...v, [k]: { url: URL.createObjectURL(f), img: (f.type||"").startsWith("image") } })); };
      i.style.cssText='position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0';document.body.appendChild(i);i.addEventListener('change',function(){setTimeout(function(){i.remove();},0);},{once:true});i.click();
    };
    const Slot = ({ k, className, style }) => (
      <div data-vslot={k} onClick={() => pick(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={style}>
        {vids[k]
          ? (vids[k].img ? <img src={vids[k].url} className="w-full h-full object-cover" /> : <video src={vids[k].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />)
          : null}
      </div>
    );

    // the prompt scrolls in sync with the video's playback
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
          const frame = box.closest("[data-brief]");
          const v = frame && frame.querySelector('[data-vslot="slot1"] video');
          const inner = box.firstElementChild;
          if (inner) {
            const over = inner.scrollHeight - box.clientHeight;
            if (v && v.duration && over > 0) inner.style.transform = "translateY(-" + (Math.min(1, ((v.currentTime || 0) / v.duration) * (speedRef.current || 1)) * over).toFixed(1) + "px)";
            else inner.style.transform = "";
          }
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, []);

    const PROMPT_TEXT = "A cinematic product ad. Slow-motion splash, studio lighting, ultra-detailed 4K. Camera slowly approaches, the scene quiet, almost too still. Main character steps into frame. Tight, low angle. No expression. Just breath.";

    return (
      <div data-brief className="relative overflow-hidden bg-[#0f0f13]" style={{ width: 1280, height: 720 }}>
        <div className="hidden" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[64px] items-center">
          {/* left: prompt */}
          <div className="flex flex-col w-[620px]">
            <p className="font-bold leading-none text-[28px] text-white tracking-[1.2px] uppercase font-[Geist,sans-serif]">Prompt</p>
            <div ref={boxRef} data-scrolltext className="mt-[24px] w-full h-[520px] overflow-hidden">
              <p className="text-[#c8c8ce] text-[24px] leading-[1.55] font-normal font-[Geist,sans-serif]">{PROMPT_TEXT}</p>
            </div>
          </div>
          {/* right: the 9:16 result */}
          <Slot k="slot1" className="shrink-0 w-[350px] h-[622px] rounded-[20px] bg-[#9f9f9f]" />
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({
    id: "prompt-duo-16x9",
    name: "Prompt + Video 16:9",
    width: 1280,
    height: 720,
    slots: 1,
    desc: "Widescreen split: the prompt on the left, the 9:16 result on the right. The prompt scrolls with playback.",
    Component
  });
})();
