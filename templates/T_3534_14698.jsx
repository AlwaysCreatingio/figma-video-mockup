/* Template 3534-14698 — Dual Phone Comparison (16:9) */
(function () {
  if (typeof document !== 'undefined' && !document.getElementById('ao-glow-style')) {
    const s = document.createElement('style');
    s.id = 'ao-glow-style';
    s.textContent =
      "@property --ao-a{syntax:'<angle>';inherits:false;initial-value:0deg;}" +
      ".ao-glow{position:relative;}" +
      ".ao-glow::after{content:'';position:absolute;inset:-3px;border-radius:inherit;padding:3px;" +
      "background:conic-gradient(from var(--ao-a),transparent 0deg,#ffffff 60deg,rgba(255,255,255,0.9) 120deg,transparent 200deg,transparent 360deg);" +
      "-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;" +
      "filter:drop-shadow(0 0 8px rgba(255,255,255,0.85));animation:ao-glow-spin 3s linear infinite;pointer-events:none;z-index:20;}" +
      "@keyframes ao-glow-spin{to{--ao-a:360deg;}}";
    document.head.appendChild(s);
  }

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
      <div data-vslot={k} onClick={() => pick(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={style}>
        {vids[k]
          ? (vids[k].img ? <img src={vids[k].url} className="w-full h-full object-cover" /> : <video src={vids[k].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />)
          : null}
      </div>
    );

    const badgeStyle = {
      backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), linear-gradient(90deg, rgba(104, 104, 104, 0.4) 0%, rgba(104, 104, 104, 0.4) 100%)"
    };

    const Card = ({ k, label, logo }) => (
      <div className="relative shrink-0 w-[452px] h-[472px]">
        <Slot k={k} className="absolute inset-0 bg-[#a7aaab]" />
        <div data-pin data-swap={logo ? "label-" + k : undefined} className="absolute top-[12.636px] left-[12.636px] flex items-center justify-center p-[10px] rounded-[7.624px]" style={badgeStyle}>
          {logo && labelText["label-" + k] == null
            ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[26px] object-contain" />
            : <p className="font-medium leading-none text-[16px] text-center text-white tracking-[0.48px] uppercase whitespace-nowrap font-[Geist,sans-serif]">
                {logo ? labelText["label-" + k] : label}
              </p>}
        </div>
      </div>
    );

    return (
      <div className="relative overflow-hidden bg-[#181818]" style={{ width: 1024, height: 576 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(130% 90% at 50% 118%, rgba(140,150,170,0.22), transparent 55%)" }} />
        <div className="-translate-x-1/2 absolute flex gap-[40px] items-center left-1/2 top-[61px]">
          {Card({ k: "slot1", label: "RAW FOOTAGE" })}
          
            {Card({ k: "slot2", logo: true })}
          
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({ id: "3534-14698", name: "Dual Phone Comparison", width: 1024, height: 576, slots: 2, desc: "Two side-by-side vertical video cards with labels on a dark blurred backdrop", Component });
})();
