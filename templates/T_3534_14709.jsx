/* Template 3534-14709 — 16:9 Dual Video Compare */
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
          : <div className="flex flex-col items-center justify-center gap-1 text-neutral-500 group-hover:text-neutral-700">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9l5 3-5 3z" /></svg>
              <span className="text-xs font-medium">Add video</span>
            </div>}
      </div>
    );

    const labelBg = { backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), linear-gradient(90deg, rgba(104, 104, 104, 0.4) 0%, rgba(104, 104, 104, 0.4) 100%)" };

    return (
      <div className="relative overflow-hidden bg-[#181818]" style={{ width: 1056, height: 594 }}>
        <style>{`
          @property --ao-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
          @keyframes ao-glow-spin { to { --ao-angle: 360deg; } }
          .ao-glow::after {
            content: "";
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            padding: 2px;
            background: conic-gradient(from var(--ao-angle), transparent 0deg, rgba(255,255,255,0.95) 60deg, transparent 140deg, transparent 360deg);
            -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            -webkit-mask-composite: xor;
                    mask-composite: exclude;
            animation: ao-glow-spin 3s linear infinite;
            pointer-events: none;
            z-index: 5;
            filter: drop-shadow(0 0 6px rgba(255,255,255,0.7));
          }
        `}</style>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(130% 90% at 50% 118%, rgba(140,150,170,0.22), transparent 55%)" }} />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex gap-[40px] items-center left-1/2 top-1/2 z-10">
          <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-[266.011px]">
            <div className="flex items-center justify-center p-[11.979px] relative rounded-[9.583px] shrink-0 w-full" style={labelBg}>
              <p className="font-medium leading-none relative shrink-0 text-[19.167px] text-center text-white tracking-[0.575px] uppercase whitespace-nowrap font-[Geist,sans-serif]">
                RAW FOOTAGE
              </p>
            </div>
            <Slot k="slot1" className="aspect-[266.0107421875/472.9140625] bg-[#a7aaab] relative shrink-0 w-full" />
          </div>
          <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-[266.011px]">
            <div data-swap="label2" className={"flex items-center justify-center px-[11.979px] relative rounded-[9.583px] shrink-0 w-full " + (labelText.label2 != null ? "py-[11.979px]" : "py-[9.579px]")} style={labelBg}>
              {labelText.label2 == null
                ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[24px] object-contain mx-auto" />
                : <p className="font-medium leading-none relative shrink-0 text-[19.167px] text-center text-white tracking-[0.575px] uppercase whitespace-nowrap font-[Geist,sans-serif]">{labelText.label2}</p>}
            </div>
            
              <Slot k="slot2" className="aspect-[266.0107421875/472.9140625] bg-[#a7aaab] relative shrink-0 w-full" />
            
          </div>
        </div>
      </div>
    );
  }
  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({ id: "3534-14709", name: "16:9 Dual Video Compare", width: 1056, height: 594, slots: 2, desc: "16:9 dark template with two phone-format video slots labeled Raw Footage and Agent Opus", Component });
})();
