/* Template 3528-13235 — AI Product Ads 9:16 Comparison */
(function () {
  function Component(props) {
    const { useState } = React;

    const [vids, setVids] = useState(() => (props && props.preload && props.preload.vids) || {});
    React.useEffect(() => { window.__slotAPI = { setVids }; return () => { window.__slotAPI = null; }; }, []);
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
      <div data-vslot={k} onClick={() => pick(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={style}>
        {vids[k]
          ? (vids[k].img ? <img src={vids[k].url} className="w-full h-full object-cover" /> : <video src={vids[k].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />)
          : <div className="flex flex-col items-center justify-center gap-1 text-neutral-500 group-hover:text-neutral-700">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9l5 3-5 3z" /></svg>
              <span className="text-xs font-medium">Add video</span>
            </div>}
      </div>
    );

    const badgeBg = { backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), linear-gradient(90deg, rgba(104, 104, 104, 0.4) 0%, rgba(104, 104, 104, 0.4) 100%)" };

    const Card = ({ k, label }) => (
      <div className="relative h-[294.155px] w-full rounded-[20px] overflow-hidden">
        <Slot k={k} className="absolute inset-0 bg-[rgba(255,255,255,0.6)]" />
        <div className="relative p-[14px] pointer-events-none">
          <div className="inline-flex items-center justify-center px-[15px] py-[13px] rounded-[12px]" style={badgeBg}>
            {String(label).toLowerCase() === "agent opus"
              ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[34px] object-contain" />
              : <p className="font-[Geist,sans-serif] font-medium leading-none text-[24px] text-center text-white tracking-[0.72px] uppercase whitespace-nowrap">
                  {label}
                </p>}
          </div>
        </div>
      </div>
    );

    return (
      <div className="relative overflow-hidden bg-[#101010]" style={{ width: 594, height: 1056 }}>
        {/* Ambient blurred footage backdrop (behind content) */}
        {(() => { const __a = (vids["slot1"] || vids["slot2"]); return __a ? (__a.img ? <img src={__a.url} className="absolute inset-0 w-full h-full object-cover blur-[60px] opacity-30 scale-110 pointer-events-none" /> : <video src={__a.url} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover blur-[60px] opacity-30 scale-110 pointer-events-none" />) : <div className="hidden" />; })()}

        {/* Centered content */}
        <div className="z-10 -translate-x-1/2 -translate-y-1/2 absolute flex flex-col gap-[40px] items-start left-1/2 top-[calc(50%-33px)] w-[522.941px]">
          <p className="font-[Geist,sans-serif] font-medium leading-none text-[44px] text-center text-white tracking-[-0.22px] w-full">
            AI for Product ads
          </p>

          <div className="flex flex-col gap-[20px] items-start w-full">
            
              <Card k="slot1" label="agent opus" />
            
            <Card k="slot2" label="original" />
          </div>
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({ id: "3528-13235", name: "AI Product Ads 9:16 Comparison", width: 594, height: 1056, slots: 2, desc: "Vertical 9:16 ad mockup comparing two labeled video slots (Agent Opus vs Original).", Component });
})();
