/* Template recipe-1x1 — Idea Recipe 1:1 (white left: brand + idea image + partner with converging arrows; right: result video with watermark) */
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
        : <span className="text-[13px] font-medium text-neutral-400 group-hover:text-neutral-600">{k === "slot2" ? "idea" : "upload"}</span>}
      </div>
    );

    const [logos, setLogos] = useState(() => (props && props.preload && props.preload.logos) || { l1: window.__AGENT_OPUS_MARK, l2: window.__AGENT_OPUS_MARK, lw: window.__AGENT_OPUS_MARK });
    const [logoBgs, setLogoBgs] = useState(() => (props && props.preload && props.preload.logoBgs) || { l1: "#d77655", l2: "#111111", lw: "#111111" });
    const [logoScales, setLogoScales] = useState(() => (props && props.preload && props.preload.logoScales) || {});
    const [logoBorders, setLogoBorders] = useState(() => (props && props.preload && props.preload.logoBorders) || {});
    const __logoBorder = (k) => (logoBorders[k] !== undefined ? logoBorders[k] : null);
    const [logoBorderWs, setLogoBorderWs] = useState(() => (props && props.preload && props.preload.logoBorderWs) || {});
    const __logoBorderW = (k) => (logoBorderWs[k] != null ? logoBorderWs[k] : 2);
    const [logoRadii, setLogoRadii] = useState(() => (props && props.preload && props.preload.logoRadii) || {});
    const [logoFits, setLogoFits] = useState(() => (props && props.preload && props.preload.logoFits) || {});
    const __logoFit = (k) => (logoFits[k] || (((window.__FILL_LOGOS || []).indexOf(logos[k]) >= 0) ? "cover" : "contain"));
    React.useEffect(() => { if (window.__slotAPI) { window.__slotAPI.setLogos = setLogos; window.__slotAPI.setLogoScales = setLogoScales; window.__slotAPI.setLogoBgs = setLogoBgs; window.__slotAPI.setLogoBorders = setLogoBorders; window.__slotAPI.setLogoBorderWs = setLogoBorderWs; window.__slotAPI.setLogoRadii = setLogoRadii; window.__slotAPI.setLogoFits = setLogoFits; } }, []);
    const __logoBg = (k) => (logoBgs[k] != null ? logoBgs[k] : null);
    const __logoScale = (k) => (logoScales[k] != null ? logoScales[k] : 0.7);
    const __openLogo = (k) => { if (window.__selectLogo) window.__selectLogo({ k, hasLogo: !!logos[k], uri: logos[k], bg: __logoBg(k) || "#111111", scale: __logoScale(k), setBg: v => setLogoBgs(m => ({ ...m, [k]: v })), setScale: v => setLogoScales(m => ({ ...m, [k]: v })), border: __logoBorder(k), setBorder: v => setLogoBorders(m => ({ ...m, [k]: v })), borderW: __logoBorderW(k), setBorderW: v => setLogoBorderWs(m => ({ ...m, [k]: v })), radius: logoRadii[k] != null ? logoRadii[k] : (k === "lw" ? 12 : 28), setRadius: v => setLogoRadii(m => ({ ...m, [k]: v })), fit: __logoFit(k), setFit: v => setLogoFits(m => ({ ...m, [k]: v })), replace: () => { if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); } }); else if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); };
    const LogoSlot = ({ k, className, style }) => (
      <div data-lslot={k} onClick={() => __openLogo(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={{ ...(style || {}), ...(logos[k] && __logoBg(k) ? { backgroundColor: __logoBg(k) } : {}), ...(__logoBorder(k) ? { border: __logoBorderW(k) + "px solid " + __logoBorder(k), boxSizing: "border-box" } : {}), ...(logoRadii[k] != null ? { borderRadius: logoRadii[k] + "px" } : {}) }}>
        {logos[k]
          ? <img src={logos[k]} style={{ transform: 'scale(' + __logoScale(k) + ')', transformOrigin: 'center' }} className={"w-full h-full " + (__logoFit(k) === "cover" ? "object-cover" : "object-contain p-[8px]")} />
          : <span className="text-[10px] font-medium text-neutral-400 group-hover:text-neutral-600">logo</span>}
      </div>
    );

    const Plus = () => <span className="text-black text-[52px] leading-none font-bold font-[Geist,sans-serif]">+</span>;

    return (
      <div className="relative overflow-hidden bg-white" style={{ width: 1080, height: 1080 }}>
        <div className="hidden" />
        {/* right: the result video fills the right side */}
        <Slot k="slot1" className="absolute top-0 right-0 h-full bg-[#2a2a2e]" style={{ width: 600 }} />
        {/* watermark logo, top-right over the video */}
        <LogoSlot k="lw" className="absolute rounded-[12px] size-[84px]" style={{ top: 34, right: 34 }} />

        {/* left column: brand + idea + partner, stacked with plus signs */}
        <div className="absolute left-0 top-0 flex flex-col items-center justify-center gap-[16px]" style={{ width: 300, height: 1080, paddingLeft: 40 }}>
          <LogoSlot k="l1" className="rounded-[28px] shrink-0 size-[168px]" />
          <Plus />
          <Slot k="slot2" className="shrink-0 w-[210px] h-[168px] bg-[#f1f0ec] rounded-[20px] border border-black/5" />
          <Plus />
          <LogoSlot k="l2" className="rounded-[28px] shrink-0 size-[168px]" />
        </div>

        {/* three smooth strokes converging into the result */}
        <svg className="absolute pointer-events-none" style={{ left: 300, top: 0 }} width="200" height="1080" viewBox="0 0 200 1080" fill="none">
          <g stroke="#111111" strokeWidth="8" strokeLinecap="round" fill="none">
            <path d="M6 264 C 78 300, 118 424, 138 524" />
            <path d="M4 540 L138 540" />
            <path d="M6 816 C 78 780, 118 656, 138 556" />
          </g>
          <g fill="#111111">
            <path d="M136 510 L162 524 L136 538 Z" />
            <path d="M138 526 L164 540 L138 554 Z" />
            <path d="M136 542 L162 556 L136 570 Z" />
          </g>
        </svg>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({ id: "recipe-1x1", name: "Idea Recipe 1:1", width: 1080, height: 1080, slots: 2, logoSlots: 3, desc: "Square split: brand + an uploadable idea image + partner logos joined by plus signs and converging arrows on white, feeding the result video on the right with a corner watermark.", Component });
})();
