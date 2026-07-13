/* Template 3534-14617 — 16:9 Raw Footage vs Agent Opus Compare */
(function () {
  if (typeof document !== "undefined" && !document.getElementById("ao-glow-style")) {
    var s = document.createElement("style");
    s.id = "ao-glow-style";
    s.textContent = "@property --ao-angle{syntax:'<angle>';initial-value:0deg;inherits:false;}"
      + ".ao-glow{position:relative;}"
      + ".ao-glow::after{content:'';position:absolute;inset:-2px;border-radius:inherit;padding:2px;"
      + "background:conic-gradient(from var(--ao-angle),transparent 0deg,rgba(255,255,255,0.05) 60deg,#ffffff 120deg,rgba(255,255,255,0.05) 180deg,transparent 300deg);"
      + "-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;"
      + "mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude;"
      + "filter:drop-shadow(0 0 6px rgba(255,255,255,0.85));pointer-events:none;z-index:2;"
      + "animation:ao-glow-spin 3s linear infinite;}"
      + "@keyframes ao-glow-spin{to{--ao-angle:360deg;}}";
    document.head.appendChild(s);
  }
  function Component(props) {
    const { useState } = React;
    const imgScreenshot = "https://www.figma.com/api/mcp/asset/a54193f9-3d23-4f19-905a-da4966dcd412";

    const [vids, setVids] = useState(() => (props && props.preload && props.preload.vids) || {});
    React.useEffect(() => { window.__slotAPI = { setVids }; return () => { window.__slotAPI = null; }; }, []);
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
          : <div className="flex flex-col items-center justify-center gap-1 text-neutral-400 group-hover:text-neutral-600">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9l5 3-5 3z" /></svg>
              <span className="text-xs font-medium">Add video</span>
            </div>}
      </div>
    );

    return (
      <div className="relative overflow-hidden bg-[#181818]" style={{ width: 1056, height: 594 }}>
        <div className="absolute blur-[360.956px] bottom-[-2911.75px] h-[4801.124px] left-[-2103.83px] opacity-30 w-[4634.49px]">
          <img alt="" className="absolute inset-0 max-w-none object-bottom pointer-events-none size-full" src={imgScreenshot} />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex gap-[24px] items-center left-1/2 top-1/2">
          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-[504px]">
            <div className="flex items-center justify-center p-[10px] relative rounded-[7.624px] shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), linear-gradient(90deg, rgba(104, 104, 104, 0.4) 0%, rgba(104, 104, 104, 0.4) 100%)" }}>
              <p className="font-medium leading-none relative shrink-0 text-[16px] text-center text-white tracking-[0.48px] uppercase whitespace-nowrap" style={{ fontFamily: "'Geist', sans-serif" }}>
                raw footage
              </p>
            </div>
            <Slot k="slot1" className="bg-[rgba(255,255,255,0.6)] relative rounded-[20px] shrink-0 w-full" style={{ aspectRatio: "467.03857421875/262.7091979980469" }} />
          </div>
          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-[504px]">
            <div className="flex items-center justify-center p-[10px] relative rounded-[7.624px] shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), linear-gradient(90deg, rgba(104, 104, 104, 0.4) 0%, rgba(104, 104, 104, 0.4) 100%)" }}>
              <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[26px] object-contain" />
            </div>
            
              <Slot k="slot2" className="bg-[rgba(255,255,255,0.6)] relative rounded-[20px] shrink-0 w-full" style={{ aspectRatio: "467.03857421875/262.7091979980469" }} />
            
          </div>
        </div>
      </div>
    );
  }
  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({ id: "3534-14617", name: "Raw Footage vs Agent Opus Compare", width: 1056, height: 594, slots: 2, desc: "16:9 dark dashboard with two labeled side-by-side video comparison slots.", Component });
})();
