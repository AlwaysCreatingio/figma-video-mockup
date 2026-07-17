/* Template collab-stack-1x1 — Product Collab Stack 1:1 (brand + product shot + partner stacked left, 9:16 video right) */
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
    const __logoBorder = (k) => (logoBorders[k] !== undefined ? logoBorders[k] : null);
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
          ? <img src={logos[k]} style={{ transform: 'scale(' + __logoScale(k) + ')', transformOrigin: 'center' }} className={"w-full h-full " + (__logoFit(k) === "cover" ? "object-cover" : "object-contain p-[8px]")} />
          : <span className="text-[10px] font-medium text-neutral-400 group-hover:text-neutral-600">logo</span>}
      </div>
    );

    return (
      <div className="relative overflow-hidden bg-white" style={{ width: 1080, height: 1080 }}>
        <div className="hidden" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[100px] items-center">
          {/* left: brand + product shot + partner stacked with plus signs */}
          <div className="flex flex-col items-center gap-[14px]">
            <LogoSlot k="l1" className="rounded-[44px] shrink-0 size-[220px] bg-[#f4f4f4]" />
            <span className="text-black text-[60px] leading-none font-bold font-[Geist,sans-serif]">+</span>
            <Slot k="slot2" className="shrink-0 w-[240px] h-[240px] bg-[#f4f4f4] rounded-[24px]" />
            <span className="text-black text-[60px] leading-none font-bold font-[Geist,sans-serif]">+</span>
            <LogoSlot k="l2" className="rounded-[44px] shrink-0 size-[220px] bg-[#111111]" />
          </div>
          {/* right: the 9:16 ad video */}
          <Slot k="slot1" className="shrink-0 w-[506px] h-[900px] rounded-[24px] bg-[#9f9f9f]" />
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({
    id: "collab-stack-1x1",
    name: "Product Collab Stack 1:1",
    width: 1080,
    height: 1080,
    slots: 2,
    logoSlots: 2,
    desc: "Square collab: brand + uploadable product shot + partner logos stacked vertically on the left, the 9:16 ad video on the right, all on white.",
    Component
  });
})();
