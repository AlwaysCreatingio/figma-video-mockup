/* Template brief-9x16 — Prompt + Refs 9:16 */
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
      <div data-brief className="relative overflow-hidden bg-[#0f0f13]" style={{ width: 1080, height: 1920 }}>
        <div className="hidden" />
        <div className="absolute left-1/2 top-[84px] -translate-x-1/2 h-[56px]">
          <div data-swap="brand" className="h-[56px] flex items-center justify-center">
            {labelText.brand === "@logo" || labelText.brand == null
              ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-full object-contain" />
              : <p className="font-bold leading-none text-white text-center font-[Geist,sans-serif] whitespace-nowrap" style={{ fontSize: "1em" }}>{labelText.brand}</p>}
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[44px] items-center">
          {/* left: prompt + references */}
          <div className="flex flex-col w-[440px] h-[930px]">
            <p className="font-bold leading-none text-[34px] text-white tracking-[1.4px] uppercase font-[Geist,sans-serif]">Prompt</p>
            <div ref={boxRef} data-scrolltext className="mt-[24px] w-full flex-1 min-h-0 overflow-hidden">
              <p className="text-[#c8c8ce] text-[27px] leading-[1.5] font-normal font-[Geist,sans-serif]">{PROMPT_TEXT}</p>
            </div>
            <p className="mt-[48px] font-bold leading-none text-[34px] text-white tracking-[1.4px] uppercase font-[Geist,sans-serif]">References</p>
            <div className="mt-[24px] flex gap-[24px]">
              <Slot k="slot2" className="w-[208px] h-[208px] rounded-[16px] bg-[#26262b]" />
              <Slot k="slot3" className="w-[208px] h-[208px] rounded-[16px] bg-[#26262b]" />
            </div>
          </div>
          {/* right: the 9:16 result */}
          <Slot k="slot1" className="shrink-0 w-[480px] h-[853px] rounded-[24px] bg-[#9f9f9f]" />
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({
    id: "brief-9x16",
    name: "Prompt + Refs 9:16",
    width: 1080,
    height: 1920,
    slots: 3,
    desc: "Vertical brief: the prompt and two reference images on the left, the 9:16 result on the right. The prompt scrolls with playback.",
    Component
  });
})();
