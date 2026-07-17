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
            if (v && v.duration && over > 0) inner.style.transform = "translateY(-" + (Math.min(1, ((v.currentTime || 0) / v.duration) * (speedRef.current || 1)) * over).toFixed(1) + "px)";
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
        <div className="absolute inset-0 flex flex-col items-center">
          {/* badge header */}
          <div className="mt-[96px] flex flex-col items-center gap-[18px]">
            <div data-swap="badge" className="inline-flex items-center justify-center px-[14px] py-[8px] bg-white">
              {labelText.badge === "@logo"
                ? <img src={window.__AO_LOGO} alt="Agent Opus" className="h-[24px] object-contain" />
                : <p className="font-bold leading-none text-[24px] text-black tracking-[1.5px] uppercase italic font-[Geist,sans-serif]">{(labelText.badge && labelText.badge !== "@logo") ? labelText.badge : "Made in"}</p>}
            </div>
            <div data-swap="title" className="flex items-center justify-center h-[64px]">
              {(labelText.title == null || labelText.title === "@logo")
                ? <span className="inline-flex items-center gap-[10px]" style={{ color: "#ffffff" }}>
                    <svg aria-label="agent opus logo" fill="currentColor" viewBox="0 0 24 24" width="52" height="52"><path d="M3.81659 11.9633C3.83636 7.46057 7.49262 3.81651 12 3.81651C16.5196 3.81651 20.1835 7.48039 20.1835 12C20.1835 16.5196 16.5196 20.1835 12 20.1835C11.4083 20.1835 10.8313 20.1207 10.2752 20.0014V23.877C10.8385 23.958 11.4143 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12V23.9633H3.81651C3.81651 23.9633 3.81659 17.1939 3.81659 12.6C3.81659 12.5076 3.81659 11.9633 3.81659 11.9633Z"></path><path d="M5.13761 11.9948V24H8.95413L8.95429 12.76V11.9633C8.97119 10.3004 10.3264 8.95413 12 8.95413C13.6841 8.95413 15.0459 10.3174 15.0459 11.9948C15.0459 13.6721 13.6841 15.0354 12 15.0354C11.3594 15.0354 10.7654 14.8381 10.2752 14.5013V18.6335C10.8264 18.776 11.4044 18.8519 12 18.8519C15.7881 18.8519 18.8624 15.7838 18.8624 11.9948C18.8624 8.20576 15.7881 5.13761 12 5.13761C8.21192 5.13761 5.13761 8.20576 5.13761 11.9948Z"></path></svg>
                    <span className="text-[54px] font-bold leading-none tracking-[-0.5px] font-[Geist,sans-serif] whitespace-nowrap">Agent Opus</span>
                  </span>
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
