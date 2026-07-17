/* Template collab-9x16 — Collab Stack 9:16 (logo + title heading, two rounded clips, midline text, purple canvas) */
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

    const [logos, setLogos] = useState(() => (props && props.preload && props.preload.logos) || { l1: window.__CLAUDE_LOGO });
    const [logoBgs, setLogoBgs] = useState(() => (props && props.preload && props.preload.logoBgs) || { l1: "transparent" });
    const [logoScales, setLogoScales] = useState(() => (props && props.preload && props.preload.logoScales) || {});
    const [logoBorders, setLogoBorders] = useState(() => (props && props.preload && props.preload.logoBorders) || {});
    const __logoBorder = (k) => (logoBorders[k] !== undefined ? logoBorders[k] : null);
    const [logoBorderWs, setLogoBorderWs] = useState(() => (props && props.preload && props.preload.logoBorderWs) || {});
    const __logoBorderW = (k) => (logoBorderWs[k] != null ? logoBorderWs[k] : 2);
    const [logoRadii, setLogoRadii] = useState(() => (props && props.preload && props.preload.logoRadii) || {});
    const [logoFits, setLogoFits] = useState(() => (props && props.preload && props.preload.logoFits) || {});
    const __logoFit = (k) => (logoFits[k] || "contain");
    React.useEffect(() => { if (window.__slotAPI) { window.__slotAPI.setLogos = setLogos; window.__slotAPI.setLogoScales = setLogoScales; window.__slotAPI.setLogoBgs = setLogoBgs; window.__slotAPI.setLogoBorders = setLogoBorders; window.__slotAPI.setLogoBorderWs = setLogoBorderWs; window.__slotAPI.setLogoRadii = setLogoRadii; window.__slotAPI.setLogoFits = setLogoFits; } }, []);
    const __logoBg = (k) => (logoBgs[k] != null ? logoBgs[k] : null);
    const __logoScale = (k) => (logoScales[k] != null ? logoScales[k] : 1);
    const __openLogo = (k) => { if (window.__selectLogo) window.__selectLogo({ k, hasLogo: !!logos[k], uri: logos[k], bg: __logoBg(k) || "transparent", scale: __logoScale(k), setBg: v => setLogoBgs(m => ({ ...m, [k]: v })), setScale: v => setLogoScales(m => ({ ...m, [k]: v })), border: __logoBorder(k), setBorder: v => setLogoBorders(m => ({ ...m, [k]: v })), borderW: __logoBorderW(k), setBorderW: v => setLogoBorderWs(m => ({ ...m, [k]: v })), radius: logoRadii[k] != null ? logoRadii[k] : 0, setRadius: v => setLogoRadii(m => ({ ...m, [k]: v })), fit: __logoFit(k), setFit: v => setLogoFits(m => ({ ...m, [k]: v })), replace: () => { if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); } }); else if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); };
    const LogoSlot = ({ k, className, style }) => (
      <div data-lslot={k} onClick={() => __openLogo(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={{ ...(style || {}), ...(logos[k] && __logoBg(k) && __logoBg(k) !== "transparent" ? { backgroundColor: __logoBg(k) } : {}), ...(__logoBorder(k) ? { border: __logoBorderW(k) + "px solid " + __logoBorder(k), boxSizing: "border-box" } : {}), ...(logoRadii[k] != null ? { borderRadius: logoRadii[k] + "px" } : {}) }}>
        {logos[k]
          ? <img src={logos[k]} style={{ transform: 'scale(' + __logoScale(k) + ')', transformOrigin: 'center' }} className={"w-full h-full " + (__logoFit(k) === "cover" ? "object-cover" : "object-contain")} />
          : <span className="text-[10px] font-medium text-neutral-400 group-hover:text-neutral-600">logo</span>}
      </div>
    );

    return (
      <div className="relative overflow-hidden bg-[#38295C]" style={{ width: 1080, height: 1920 }}>
        <div className="hidden" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[960px]">
          {/* heading: Claude wordmark, an X you can restyle, and the Agent Opus wordmark */}
          <div className="flex items-center gap-[30px]">
            <img src={window.__CLAUDE_WORDMARK_LIGHT} alt="Claude" className="h-[68px] object-contain" />
            <p className="font-semibold leading-none text-[54px] text-[#f3ede2] font-[Geist,sans-serif]">X</p>
            <div data-swap="title" className="flex items-center justify-center h-[84px]">
              {(labelText.title == null || labelText.title === "@logo")
                ? <span className="inline-flex items-center gap-[9px]" style={{ color: "#f3ede2" }}>
                    <svg aria-label="agent opus logo" fill="currentColor" viewBox="0 0 24 24" width="54" height="54"><path d="M3.81659 11.9633C3.83636 7.46057 7.49262 3.81651 12 3.81651C16.5196 3.81651 20.1835 7.48039 20.1835 12C20.1835 16.5196 16.5196 20.1835 12 20.1835C11.4083 20.1835 10.8313 20.1207 10.2752 20.0014V23.877C10.8385 23.958 11.4143 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12V23.9633H3.81651C3.81651 23.9633 3.81659 17.1939 3.81659 12.6C3.81659 12.5076 3.81659 11.9633 3.81659 11.9633Z"></path><path d="M5.13761 11.9948V24H8.95413L8.95429 12.76V11.9633C8.97119 10.3004 10.3264 8.95413 12 8.95413C13.6841 8.95413 15.0459 10.3174 15.0459 11.9948C15.0459 13.6721 13.6841 15.0354 12 15.0354C11.3594 15.0354 10.7654 14.8381 10.2752 14.5013V18.6335C10.8264 18.776 11.4044 18.8519 12 18.8519C15.7881 18.8519 18.8624 15.7838 18.8624 11.9948C18.8624 8.20576 15.7881 5.13761 12 5.13761C8.21192 5.13761 5.13761 8.20576 5.13761 11.9948Z"></path></svg>
                    <span className="text-[54px] font-bold leading-none tracking-[-0.5px] font-[Geist,sans-serif] whitespace-nowrap">Agent Opus</span>
                  </span>
                : <p className="font-semibold leading-none text-[54px] text-[#f3ede2] tracking-[-0.5px] font-[Geist,sans-serif] whitespace-nowrap">{labelText.title}</p>}
            </div>
          </div>
          <Slot k="slot1" className="mt-[56px] w-full h-[540px] rounded-[28px] bg-[#9f9f9f]" />
          <div data-swap="mid" className="flex items-center justify-center h-[72px] mt-[52px]">
            {labelText.mid === "@logo"
              ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[56px] object-contain" />
              : <p className="font-semibold leading-none text-[60px] text-[#f3ede2] tracking-[-0.4px] font-[Geist,sans-serif] whitespace-nowrap">{(labelText.mid && labelText.mid !== "@logo") ? labelText.mid : "100% Automated"}</p>}
          </div>
          <Slot k="slot2" className="mt-[52px] w-full h-[540px] rounded-[28px] bg-[#8f8f8f]" />
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({
    id: "collab-9x16",
    name: "Collab Stack 9:16",
    width: 1080,
    height: 1920,
    slots: 2,
    logoSlots: 0,
    desc: "Vertical reel on a deep purple canvas: logo + collab title up top, two rounded clips stacked around a 100% Automated midline.",
    Component
  });
})();
