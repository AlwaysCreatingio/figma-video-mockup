/* Template 3528-13213 — Before/After 9:16 Comparison */
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
      i.onchange = e => {
        const f = e.target.files[0];
        if (f) setVids(v => ({ ...v, [k]: { url: URL.createObjectURL(f), img: (f.type||"").startsWith("image") } }));
      };
      i.style.cssText='position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0';document.body.appendChild(i);i.addEventListener('change',function(){setTimeout(function(){i.remove();},0);},{once:true});i.click();
    };
    const Slot = ({ k, className, style }) => (
      <div
        data-vslot={k} onClick={() => pick(k)}
        className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')}
        style={style}
      >
        {vids[k] ? (
          (vids[k].img ? <img src={vids[k].url} className="w-full h-full object-cover" /> : <video src={vids[k].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />)
        ) : (
          null
        )}
      </div>
    );

    const [logos, setLogos] = useState(() => (props && props.preload && props.preload.logos) || { logo1: window.__CLAUDE_LOGO, logo2: window.__AGENT_OPUS_MARK });
    const [logoBgs, setLogoBgs] = useState(() => (props && props.preload && props.preload.logoBgs) || {});
    const [logoScales, setLogoScales] = useState(() => (props && props.preload && props.preload.logoScales) || { logo1: 0.7 });
    const [logoBgDefault, setLogoBgDefault] = useState({});
    const [showPlus, setShowPlus] = useState(() => (props && props.preload && props.preload.showPlus != null) ? props.preload.showPlus : true);
    const [hidden, setHidden] = useState(() => (props && props.preload && props.preload.hiddenLogos) || {});
    const [logosHidden, setLogosHidden] = useState(() => (props && props.preload && props.preload.logosHidden) || false);
    React.useEffect(() => { if (window.__slotAPI) { window.__slotAPI.setLogos = setLogos; window.__slotAPI.setLogoScales = setLogoScales; window.__slotAPI.setLogoBgs = setLogoBgs; window.__slotAPI.setShowPlus = setShowPlus; window.__slotAPI.setHiddenLogos = setHidden; window.__slotAPI.setLogosHidden = setLogosHidden; } }, []);
    React.useEffect(() => { if (window.__slotAPI) { window.__slotAPI.hiddenLogos = hidden; window.__slotAPI.logosHidden = logosHidden; } }, [hidden, logosHidden]);
    React.useEffect(() => {
      if (!window.__slotAPI) return;
      window.__slotAPI.setLogoCount = (n) => { setHidden(n >= 3 ? {} : n === 2 ? { logo3: true } : { logo2: true, logo3: true }); setLogosHidden(false); };
      window.__slotAPI.setPlusOn = setShowPlus;
    }, []);
    React.useEffect(() => { if (window.__slotAPI) { window.__slotAPI.logoCount = ["logo1", "logo2", "logo3"].filter(k => !hidden[k]).length; window.__slotAPI.plusOn = showPlus; } }, [hidden, showPlus]);
    React.useEffect(() => { let on = true; Object.keys(logos).forEach(k => { const u = logos[k]; if (u && window.__logoDominant) window.__logoDominant(u).then(c => { if (on && c) setLogoBgDefault(m => (m[k] === c ? m : { ...m, [k]: c })); }); }); return () => { on = false; }; }, [logos]);
    const __logoBg = (k) => (logoBgs[k] != null ? logoBgs[k] : (logoBgDefault[k] != null ? logoBgDefault[k] : (window.__LOGO_BG || {})[logos[k]]));
    const __logoScale = (k) => (logoScales[k] != null ? logoScales[k] : ((window.__LOGO_SCALE_DEFAULTS || {})[logos[k]] || 1));
    const __openLogo = (k) => { if (window.__selectLogo) window.__selectLogo({ k, hasLogo: !!logos[k], uri: logos[k], bg: __logoBg(k) || "#ffffff", scale: __logoScale(k), setBg: v => setLogoBgs(m => ({ ...m, [k]: v })), setScale: v => setLogoScales(m => ({ ...m, [k]: v })), replace: () => { if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); }, remove: () => setHidden(h => ({ ...h, [k]: true })) }); else if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); };
    const pickLogo = k => { if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); };
    const LogoSlot = ({ k, className, style }) => (
      <div data-lslot={k} onClick={() => __openLogo(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={{ ...(style || {}), ...(logos[k] && __logoBg(k) ? { backgroundColor: __logoBg(k) } : {}) }}>
        {logos[k]
          ? <img src={logos[k]} style={{ transform: 'scale(' + __logoScale(k) + ')', transformOrigin: 'center' }} className={"w-full h-full " + ((window.__FILL_LOGOS||[]).indexOf(logos[k])>=0 ? "object-cover" : "object-contain p-[10px]")} />
          : <span className="text-[10px] font-medium text-neutral-400 group-hover:text-neutral-600">logo</span>}
      </div>
    );

    return (
      <div className="bg-[#ededed] relative overflow-hidden" style={{ width: 594, height: 1056 }}>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col gap-[42px] items-center left-1/2 top-1/2 w-[522.941px]">
          {/* Top avatar squares — visible tiles only, with "+" between when enabled */}
          {logosHidden
            ? null
            : (() => {
              const vis = ["logo1", "logo2", "logo3"].filter(k => !hidden[k]);
              return (
                <div data-logogroup className="relative group flex flex-col items-center">
                  <div className={"flex items-center relative shrink-0 " + (showPlus ? "gap-[18px]" : "gap-[33px]")}>
                    {vis.map((k, i) => (
                      <React.Fragment key={k}>
                        {i > 0 && showPlus && <span data-plus className="text-neutral-500 text-[30px] leading-none font-light">+</span>}
                        <LogoSlot k={k} className="bg-[#565656] relative rounded-[14px] shrink-0 size-[80px]" />
                      </React.Fragment>
                    ))}
                  </div>

                </div>
              );
            })()}

          {/* Two comparison columns */}
          <div className="flex gap-[40px] items-start relative shrink-0 w-full">
            <div className="flex flex-col gap-[20px] items-center relative shrink-0 w-[241.471px]">
              <div className="flex items-center justify-center w-full" style={{ height: 40 }}>
                <p className="font-[Geist,sans-serif] font-bold leading-none text-[32px] text-black text-center tracking-[-0.16px] uppercase">
                  ORIGINAL
                </p>
              </div>
              <Slot k="slot1" className="aspect-[1080/1920] bg-[#565656] relative shrink-0 w-full" />
            </div>
            <div className="flex flex-col gap-[20px] items-center relative shrink-0 w-[241.471px]">
              <div data-swap="label2" className="flex items-center justify-center w-full" style={{ height: 40 }}>
                {labelText.label2 == null
                  ? <img src={window.__AO_LOGO} alt="Agent Opus" className="h-[36px] object-contain" />
                  : <p className="font-[Geist,sans-serif] font-bold leading-none text-[32px] text-black text-center tracking-[-0.16px] uppercase">{labelText.label2}</p>}
              </div>
              <Slot k="slot2" className="aspect-[1080/1920] bg-[#565656] relative shrink-0 w-full" />
            </div>
          </div>

          {/* Bottom comment */}
          <p className="font-[Geist,sans-serif] font-bold relative shrink-0 text-center tracking-[-0.2px] w-full leading-none">
            <span className="text-black text-[40px]">Comment </span>
            <span className="text-[#ff570a] text-[40px]">{'“Agent Opus”'}</span>
          </p>
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({
    id: "3528-13213",
    name: "Before/After 9:16 Comparison",
    width: 594,
    height: 1056,
    slots: 2,
    logoSlots: 3,
    desc: "Vertical 9:16 template with ORIGINAL vs AGENT OPUS side-by-side video slots and a comment CTA",
    Component
  });
})();
