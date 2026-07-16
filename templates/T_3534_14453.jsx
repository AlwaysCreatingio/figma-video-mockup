/* Template 3534-14453 — AI Product Ads 9:16 Comparison */
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
      <div
        data-vslot={k} onClick={() => pick(k)}
        className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')}
        style={style}
      >
        {vids[k] ? (
          (vids[k].img ? <img src={vids[k].url} className="w-full h-full object-cover" /> : <video src={vids[k].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />)
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 text-neutral-400 group-hover:text-neutral-600">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M10 9l5 3-5 3z" />
            </svg>
            <span className="text-xs font-medium">Add video</span>
          </div>
        )}
      </div>
    );

    const chipStyle = {
      backgroundImage:
        "linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), linear-gradient(90deg, rgba(104, 104, 104, 0.4) 0%, rgba(104, 104, 104, 0.4) 100%)"
    };

    return (
      <div className="relative overflow-hidden bg-[#101010]" style={{ width: 576, height: 1024 }}>
        {/* Ambient blurred background mirroring the uploaded footage */}
        {(vids["slot1"] || vids["slot2"]) && (
          <video
            src={vids["slot1"] || vids["slot2"]}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover blur-[60px] opacity-30 scale-110 pointer-events-none"
          />
        )}

        {/* Centered content */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[40px] items-start w-[522.941px]"
          style={{ left: '50%', top: 'calc(50% - 33px)' }}
        >
          <p
            className="font-medium h-[50.488px] leading-none text-[44px] text-center text-white tracking-[-0.22px] w-full font-[Geist,sans-serif]"
          >
            AI for Product ads
          </p>

          <div className="flex flex-col gap-[20px] items-start w-full">
            {/* Card 1 */}
            
              <div className="relative h-[294.155px] w-full">
                <Slot k="slot1" className="absolute inset-0 bg-[rgba(255,255,255,0.6)] " />
                <div
                  className="absolute top-[14px] left-[14px] flex items-center justify-center px-[16px] py-[9px] rounded-[12px] pointer-events-none"
                  style={chipStyle}
                >
                  <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[30px] object-contain" />
                </div>
              </div>
            

            {/* Card 2 */}
            <div className="relative h-[294.155px] w-full">
              <Slot k="slot2" className="absolute inset-0 bg-[rgba(255,255,255,0.6)] " />
              <div
                className="absolute top-[14px] left-[14px] flex items-center justify-center px-[16px] py-[9px] rounded-[12px] pointer-events-none"
                style={chipStyle}
              >
                <p
                  className="font-medium leading-none text-[24px] text-center text-white tracking-[0.72px] uppercase whitespace-nowrap font-[Geist,sans-serif]"
                >
                  original
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({
    id: "3534-14453",
    name: "AI Product Ads 9:16 Comparison",
    width: 576,
    height: 1024,
    slots: 2,
    desc: "Vertical 9:16 ad template comparing two labeled video cards over a blurred backdrop.",
    Component
  });
})();
