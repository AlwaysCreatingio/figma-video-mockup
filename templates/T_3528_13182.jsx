/* Template 3528-13182 — Comment "Agent Opus" 9:16 phone mockup */
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

    return (
      <div className="relative overflow-hidden bg-[#131212]" style={{ width: 594, height: 1056 }}>
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col gap-[40px] items-center left-1/2 w-[522.941px]"
          style={{ top: 'calc(50% - 4.12px)' }}
        >
          <p
            className="font-medium text-center text-white w-full"
            style={{
              fontFamily: "'Geist','Geist SemiBold',sans-serif",
              letterSpacing: '-0.34px',
              lineHeight: 1
            }}
          >
            <span style={{ fontSize: '66px', lineHeight: 1 }}>Comment</span>
            <span style={{ fontSize: '68px', lineHeight: 1 }}>{` `}</span>
            <span style={{ fontSize: '75px', lineHeight: 1, color: '#ff570a' }}>“Agent Opus”</span>
          </p>
          <div className="flex flex-col items-center h-[620px] w-[348.75px]">
            <Slot
              k="slot1"
              className="bg-white rounded-[28.885px] w-full h-full"
            />
          </div>
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({
    id: "3528-13182",
    name: "Comment Agent Opus 9:16",
    width: 594,
    height: 1056,
    slots: 1,
    desc: "Vertical 9:16 promo with headline and centered phone-screen video slot on dark background",
    Component
  });
})();
