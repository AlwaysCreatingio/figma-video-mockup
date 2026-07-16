/* Template 3534-14597 — Dual 16:9 Video Compare */
(function () {
  function Component(props) {
    const { useState } = React;

    const [vids, setVids] = useState(() => (props && props.preload && props.preload.vids) || {});
    const [labelText, setLabelText] = useState(() => (props && props.preload && props.preload.labelText) || {});
    React.useEffect(() => { window.__slotAPI = { setVids }; return () => { window.__slotAPI = null; }; }, []);
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

    const pillStyle = { backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), linear-gradient(90deg, rgba(104, 104, 104, 0.4) 0%, rgba(104, 104, 104, 0.4) 100%)" };
    const Label = ({ k, text, logo }) => (
      <div data-pin data-swap={logo ? k : undefined} className="absolute left-[12.136px] top-[12.136px] z-10 flex items-center justify-center p-[10px] rounded-[7.624px]" style={pillStyle}>
        {logo && labelText[k] == null
          ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[26px] object-contain" />
          : <p className="font-medium text-[16px] leading-none text-center text-white tracking-[0.48px] uppercase whitespace-nowrap font-[Geist,sans-serif]">{logo ? labelText[k] : text}</p>}
      </div>
    );

    const Card = ({ k, text, logo }) => (
      <div className="relative shrink-0 w-[504px] h-[283.5px]">
        <Slot k={k} className="absolute inset-0 bg-[rgba(255,255,255,0.6)] " />
        {Label({ k: "label-" + k, text, logo })}
      </div>
    );

    return (
      <div className="relative overflow-hidden bg-[#181818]" style={{ width: 1056, height: 594 }}>
        <style>{`
          @property --ao-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
          @keyframes ao-spin { to { --ao-angle: 360deg; } }
          .ao-glow::after {
            content: "";
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            padding: 2px;
            background: conic-gradient(from var(--ao-angle), rgba(255,255,255,0) 0deg, rgba(255,255,255,0.05) 60deg, #ffffff 160deg, #ffffff 200deg, rgba(255,255,255,0.05) 300deg, rgba(255,255,255,0) 360deg);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            filter: drop-shadow(0 0 6px rgba(255,255,255,0.8));
            animation: ao-spin 3s linear infinite;
            pointer-events: none;
            z-index: 20;
          }
        `}</style>
        <div className="hidden" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[36px] items-center">
          {/* editable title above the videos — click to edit; leave empty to omit */}
          <p className="w-[1024px] text-center text-white text-[38px] font-semibold leading-none tracking-[-0.4px] font-[Geist,sans-serif]">Same clip. Two results.</p>
          <div className="flex gap-[16px] items-center">
            {Card({ k: "slot1", text: "RAW FOOTAGE" })}
            {Card({ k: "slot2", logo: true })}
          </div>
          {/* smaller CTA under the videos */}
          <p className="w-[1024px] text-center text-white/60 text-[17px] font-medium leading-none tracking-[0.34px] font-[Geist,sans-serif]">opus.pro/agent</p>
        </div>
      </div>
    );
  }
  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({ id: "3534-14597", name: "Dual 16:9 Video Compare", width: 1056, height: 594, slots: 2, desc: "Two side-by-side rounded 16:9 media cards with labeled pills on a blurred dark backdrop.", Component });
})();
