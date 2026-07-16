/* Template 3534-14446 — Comment "Agent Opus" 9:16 Story */
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
      <div className="relative overflow-hidden bg-[#ededed]" style={{ width: 594, height: 1056 }}>
        <div
          className="absolute left-1/2 flex flex-col gap-[40px] items-center w-[522.941px]"
          style={{ top: 'calc(50% - 4.12px)', transform: 'translate(-50%, -50%)' }}
        >
          <p
            className="font-medium text-black text-center w-full m-0 font-[Geist,sans-serif] tracking-[-0.34px] leading-none"
          >
            <span className="text-[66px]">Comment</span>
            <span className="text-[68px]">{` `}</span>
            <span className="text-[#ff570a] text-[75px]">“Agent Opus”</span>
          </p>
          <Slot
            k="slot1"
            className="bg-white "
            style={{ width: 348.75, height: 620 }}
          />
        </div>
      </div>
    );
  }
  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({
    id: "3534-14446",
    name: "Comment Agent Opus Story",
    width: 594,
    height: 1056,
    slots: 1,
    desc: "9:16 story with headline over a centered phone-screen video slot",
    Component
  });
})();
