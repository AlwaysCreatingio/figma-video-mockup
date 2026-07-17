/* Template made-in-9x16 — Made In Agent Opus 9:16 (badge header, hero clip, input image + scrolling prompt) */
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

    // long prompts scroll in sync with the hero clip's playback (speed = multiplier on progress)
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
          const frame = box.closest("[data-madein]");
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

    return (
      <div data-madein className="relative overflow-hidden bg-black" style={{ width: 1080, height: 1920 }}>
        <div className="hidden" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center">
          {/* badge header */}
          <div className="flex flex-col items-center gap-[18px]">
            <div data-swap="badge" className="inline-flex items-center justify-center px-[14px] py-[8px] bg-white">
              {labelText.badge === "@logo"
                ? <img src={window.__AO_LOGO} alt="Agent Opus" className="h-[24px] object-contain" />
                : <p className="font-bold leading-none text-[24px] text-black tracking-[1.5px] uppercase italic font-[Geist,sans-serif]">{(labelText.badge && labelText.badge !== "@logo") ? labelText.badge : "Made in"}</p>}
            </div>
            <div data-swap="title" className="flex items-center justify-center h-[96px]">
              {(labelText.title == null || labelText.title === "@logo")
                ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[84px] object-contain" />
                : <p className="font-bold leading-none text-[52px] text-white text-center tracking-[-0.4px] font-[Geist,sans-serif] whitespace-nowrap">{labelText.title}</p>}
            </div>
            <p className="font-bold leading-none text-[44px] text-[#ff570a] text-center tracking-[1px] uppercase font-[Geist,sans-serif]">Prompt to video</p>
          </div>

          {/* hero clip */}
          <Slot k="slot1" className="mt-[64px] w-full h-[608px] bg-[#9f9f9f]" />

          {/* input image + prompt */}
          <p className="mt-[72px] font-medium leading-none text-[40px] text-[#d9d9de] text-center tracking-[2px] uppercase font-[Geist,sans-serif]">Input image + prompt</p>
          <div className="mt-[56px] flex gap-[48px] w-[940px] items-start">
            <Slot k="slot2" className="shrink-0 w-[380px] h-[380px] bg-[#2a2a2e]" />
            <div ref={boxRef} data-scrolltext className="flex-1 h-[380px] min-h-0 overflow-hidden">
              <p className="text-[#c8c8ce] text-[24px] leading-[1.5] font-normal tracking-[0px] font-[Geist,sans-serif]">
                SHOT 1: Camera slowly approaches. The scene is quiet, almost too still. Voice, calm but firm. Wind passes softly. SHOT 2: Camera shifts right. Main character steps into frame. SHOT 3: Camera arcs to his face, tight, low angle. No expression. Just breath. Deceleration 85%, the moment stretches 20 frames. He lifts his chin. Camera tilts down, no cut. Reactive handheld chase, no cut.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({
    id: "made-in-9x16",
    name: "Made In Agent Opus 9:16",
    width: 1080,
    height: 1920,
    slots: 2,
    desc: "Vertical showcase: MADE IN badge over the Agent Opus wordmark, a hero clip, then the input image beside the prompt, which scrolls with playback.",
    Component
  });
})();
