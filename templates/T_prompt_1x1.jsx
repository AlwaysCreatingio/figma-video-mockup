/* Template prompt-1x1 — Prompt vs Agent Opus 1:1 (raw-1x1 variant: prompt card on the left; long prompts scroll with the video) */
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

    const [logos, setLogos] = useState(() => (props && props.preload && props.preload.logos) || { l1: window.__AGENT_OPUS_MARK, l2: window.__GEMINI_LOGO });
    const [logoBgs, setLogoBgs] = useState(() => (props && props.preload && props.preload.logoBgs) || {});
    const [logoScales, setLogoScales] = useState(() => (props && props.preload && props.preload.logoScales) || {});
    const [logoBorders, setLogoBorders] = useState(() => (props && props.preload && props.preload.logoBorders) || {});
    const __logoBorder = (k) => (logoBorders[k] !== undefined ? logoBorders[k] : "#e6e6e6");
    const [logoBorderWs, setLogoBorderWs] = useState(() => (props && props.preload && props.preload.logoBorderWs) || {});
    const __logoBorderW = (k) => (logoBorderWs[k] != null ? logoBorderWs[k] : 2);
    const [logoRadii, setLogoRadii] = useState(() => (props && props.preload && props.preload.logoRadii) || {});
    const [logoFits, setLogoFits] = useState(() => (props && props.preload && props.preload.logoFits) || {});
    const __logoFit = (k) => (logoFits[k] || (((window.__FILL_LOGOS || []).indexOf(logos[k]) >= 0) ? "cover" : "contain"));
    const [logoBgDefault, setLogoBgDefault] = useState({});
    React.useEffect(() => { if (window.__slotAPI) { window.__slotAPI.setLogos = setLogos; window.__slotAPI.setLogoScales = setLogoScales; window.__slotAPI.setLogoBgs = setLogoBgs; window.__slotAPI.setLogoBorders = setLogoBorders; window.__slotAPI.setLogoBorderWs = setLogoBorderWs; window.__slotAPI.setLogoRadii = setLogoRadii; window.__slotAPI.setLogoFits = setLogoFits; } }, []);
    React.useEffect(() => { let on = true; Object.keys(logos).forEach(k => { const u = logos[k]; if (u && window.__logoDominant) window.__logoDominant(u).then(c => { if (on && c) setLogoBgDefault(m => (m[k] === c ? m : { ...m, [k]: c })); }); }); return () => { on = false; }; }, [logos]);
    const __logoBg = (k) => (logoBgs[k] != null ? logoBgs[k] : (logoBgDefault[k] != null ? logoBgDefault[k] : (window.__LOGO_BG || {})[logos[k]]));
    const __logoScale = (k) => (logoScales[k] != null ? logoScales[k] : ((window.__LOGO_SCALE_DEFAULTS || {})[logos[k]] || 1));
    const __openLogo = (k) => { if (window.__selectLogo) window.__selectLogo({ k, hasLogo: !!logos[k], uri: logos[k], bg: __logoBg(k) || "#ffffff", scale: __logoScale(k), setBg: v => setLogoBgs(m => ({ ...m, [k]: v })), setScale: v => setLogoScales(m => ({ ...m, [k]: v })), border: __logoBorder(k), setBorder: v => setLogoBorders(m => ({ ...m, [k]: v })), borderW: __logoBorderW(k), setBorderW: v => setLogoBorderWs(m => ({ ...m, [k]: v })), radius: logoRadii[k] != null ? logoRadii[k] : 32, setRadius: v => setLogoRadii(m => ({ ...m, [k]: v })), fit: __logoFit(k), setFit: v => setLogoFits(m => ({ ...m, [k]: v })), replace: () => { if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); } }); else if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); };
    const LogoSlot = ({ k, className, style }) => (
      <div data-lslot={k} onClick={() => __openLogo(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={{ ...(style || {}), ...(logos[k] && __logoBg(k) ? { backgroundColor: __logoBg(k) } : {}), ...(__logoBorder(k) ? { border: __logoBorderW(k) + "px solid " + __logoBorder(k), boxSizing: "border-box" } : {}), ...(logoRadii[k] != null ? { borderRadius: logoRadii[k] + "px" } : {}) }}>
        {logos[k]
          ? <img src={logos[k]} style={{ transform: 'scale(' + __logoScale(k) + ')', transformOrigin: 'center' }} className={"w-full h-full " + (__logoFit(k) === "cover" ? "object-cover" : "object-contain p-[10px]")} />
          : <span className="text-[10px] font-medium text-neutral-400 group-hover:text-neutral-600">logo</span>}
      </div>
    );

    // long prompts scroll in sync with the result video's playback (speed = multiplier on progress)
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
          const frame = box.closest("[data-prompt1x1]");
          const v = frame && frame.querySelector('[data-vslot="slot2"] video');
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
      <div data-prompt1x1 className="relative overflow-hidden bg-[#FCFCFC]" style={{ width: 1080, height: 1080 }}>
        <div className="hidden" />
        <div className="absolute inset-0 flex gap-[44px] p-[48px]">
          {/* Left column: logo pair, badge, prompt card */}
          <div className="flex flex-col items-center w-[380px] shrink-0">
            <div className="flex items-center gap-[26px] self-start">
              <LogoSlot k="l1" className="rounded-[32px] shrink-0 size-[140px] bg-[#eaeaea]" />
              <span className="text-black text-[54px] leading-none font-light font-[Geist,sans-serif]">+</span>
              <LogoSlot k="l2" className="rounded-[32px] shrink-0 size-[140px] bg-[#f4f4f4]" />
            </div>
            <div data-swap="badge" className="mt-[44px] self-start inline-flex items-center justify-center border-[5px] border-black rounded-full px-[30px] py-[19px]">
              {labelText.badge === "@logo"
                ? <img src={window.__AO_LOGO} alt="Agent Opus" className="h-[40px] object-contain" />
                : <p className="font-bold leading-none text-[34px] text-black tracking-[0.6px] uppercase whitespace-nowrap font-[Geist,sans-serif]">{(labelText.badge && labelText.badge !== "@logo") ? labelText.badge : "100% AUTOMATED"}</p>}
            </div>
            <div className="mt-[44px] w-full flex-1 min-h-0 flex flex-col items-start">
              <p className="font-bold leading-none text-[34px] text-black tracking-[1.2px] uppercase font-[Geist,sans-serif]">Prompt</p>
              <div ref={boxRef} data-scrolltext className="mt-[22px] w-full flex-1 min-h-0 overflow-hidden">
                <p className="text-black/85 text-[28px] leading-[1.45] font-medium tracking-[-0.1px] font-[Geist,sans-serif]">
                  A cinematic product ad. Slow-motion splash, studio lighting, ultra-detailed 4K.
                </p>
              </div>
            </div>
          </div>

          {/* Right column: result heading + big clip */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div data-swap="label2" className="flex items-center justify-center h-[64px]">
              {labelText.label2 == null || labelText.label2 === "@logo"
                ? <span className="inline-flex items-center gap-[10px]" style={{ color: "#000000" }}>
                    <svg aria-label="agent opus logo" fill="currentColor" viewBox="0 0 24 24" width="48" height="48"><path d="M3.81659 11.9633C3.83636 7.46057 7.49262 3.81651 12 3.81651C16.5196 3.81651 20.1835 7.48039 20.1835 12C20.1835 16.5196 16.5196 20.1835 12 20.1835C11.4083 20.1835 10.8313 20.1207 10.2752 20.0014V23.877C10.8385 23.958 11.4143 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12V23.9633H3.81651C3.81651 23.9633 3.81659 17.1939 3.81659 12.6C3.81659 12.5076 3.81659 11.9633 3.81659 11.9633Z"></path><path d="M5.13761 11.9948V24H8.95413L8.95429 12.76V11.9633C8.97119 10.3004 10.3264 8.95413 12 8.95413C13.6841 8.95413 15.0459 10.3174 15.0459 11.9948C15.0459 13.6721 13.6841 15.0354 12 15.0354C11.3594 15.0354 10.7654 14.8381 10.2752 14.5013V18.6335C10.8264 18.776 11.4044 18.8519 12 18.8519C15.7881 18.8519 18.8624 15.7838 18.8624 11.9948C18.8624 8.20576 15.7881 5.13761 12 5.13761C8.21192 5.13761 5.13761 8.20576 5.13761 11.9948Z"></path></svg>
                    <span className="text-[48px] font-bold leading-none tracking-[-0.5px] font-[Geist,sans-serif] whitespace-nowrap">Agent Opus</span>
                  </span>
                : <p className="font-semibold leading-none text-[58px] text-black text-center tracking-[-0.5px] font-[Geist,sans-serif]">{labelText.label2}</p>}
            </div>
            <Slot k="slot2" className="mt-[24px] w-full flex-1 bg-[#e6e3de] rounded-[6px]" />
          </div>
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({
    id: "prompt-1x1",
    name: "Prompt vs Agent Opus 1:1",
    width: 1080,
    height: 1080,
    slots: 1,
    logoSlots: 2,
    desc: "Square light-canvas comparison: logo pair with a 100% AUTOMATED badge and a prompt card beside the Agent Opus result. Long prompts scroll with the video.",
    Component
  });
})();
