/* Template 3534-14502 — Dual Phone Video Mockup (9:16) */
(function () {
  if (typeof document !== 'undefined' && !document.getElementById('ao-glow-style')) {
    const s = document.createElement('style');
    s.id = 'ao-glow-style';
    s.textContent = `
@property --ao-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
.ao-glow { position: relative; }
.ao-glow::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  padding: 2px;
  background: conic-gradient(from var(--ao-angle), rgba(255,255,255,0) 0deg, rgba(255,255,255,0) 200deg, rgba(255,255,255,0.85) 300deg, #ffffff 340deg, rgba(255,255,255,0) 360deg);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  filter: drop-shadow(0 0 5px rgba(255,255,255,0.85));
  animation: ao-glow-spin 2.6s linear infinite;
  pointer-events: none;
}
@keyframes ao-glow-spin { to { --ao-angle: 360deg; } }
`;
    document.head.appendChild(s);
  }

  function Component(props) {
    const { useState } = React;

    const [vids, setVids] = useState(() => (props && props.preload && props.preload.vids) || {});
    React.useEffect(() => { window.__slotAPI = { setVids }; return () => { window.__slotAPI = null; }; }, []);
    const pick = (k) => {
      const i = document.createElement('input');
      i.type = 'file';
      i.accept = 'video/*,image/*';
      i.onchange = (e) => {
        const f = e.target.files[0];
        if (f) setVids((v) => ({ ...v, [k]: { url: URL.createObjectURL(f), img: (f.type||"").startsWith("image") } }));
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
          <div className="flex flex-col items-center justify-center gap-1 text-neutral-300 group-hover:text-neutral-100">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M10 9l5 3-5 3z" />
            </svg>
            <span className="text-xs font-medium">Add video</span>
          </div>
        )}
      </div>
    );

    const W = 594;
    const H = 1056;
    const geist = { fontFamily: 'Geist, sans-serif' };
    const badgeBg = {
      backgroundImage:
        'linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), linear-gradient(90deg, rgba(104, 104, 104, 0.4) 0%, rgba(104, 104, 104, 0.4) 100%)',
    };

    return (
      <div className="relative overflow-hidden bg-[#ededed]" style={{ width: W, height: H }}>
        {/* Decorative background blur layers (behind content) */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: '50%',
            top: -15,
            width: 1083,
            height: 1083,
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.05)',
            filter: 'blur(120px)',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            top: '55%',
            width: 900,
            height: 900,
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(120,120,120,0.30) 0%, rgba(120,120,120,0) 65%)',
            filter: 'blur(180px)',
          }}
        />

        {/* Card 1 — RAW FOOTAGE */}
        <div
          className="absolute rounded-[20px] overflow-hidden"
          style={{ left: 40, top: 321.53, width: 232.276, height: 412.94 }}
        >
          <Slot k="slot1" className="absolute inset-0 bg-[#7a7a7a] " />
          <div className="absolute inset-0 flex flex-col items-start p-[11.055px] pointer-events-none">
            <div
              className="flex items-center justify-center p-[11.845px] rounded-[9.476px]"
              style={badgeBg}
            >
              <p
                className="font-medium leading-none text-[18.952px] text-center text-white tracking-[0.5685px] uppercase whitespace-nowrap font-[Geist,sans-serif]"
              >
                raw footage
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 — AGENT OPUS (larger, in front, overlapping to the right) */}

          <div className="absolute rounded-[20px] overflow-hidden" style={{ left: 250, top: 266.53, width: 294.15, height: 522.94 }}>
            <Slot k="slot2" className="absolute inset-0 bg-[#474747] " />
            <div className="absolute inset-0 flex flex-col items-start p-[14px] pointer-events-none">
              <div
                className="flex items-center justify-center p-[15px] rounded-[12px]"
                style={badgeBg}
              >
                <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[30px] object-contain" />
              </div>
            </div>
          </div>
        
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({
    id: "3534-14502",
    name: "Dual Phone Video Mockup",
    width: 594,
    height: 1056,
    slots: 2,
    desc: "9:16 vertical mockup with two overlapping phone-screen video slots labeled RAW FOOTAGE and AGENT OPUS",
    Component,
  });
})();
