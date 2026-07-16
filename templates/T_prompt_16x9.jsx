/* Template prompt-16x9 — Prompt to Video 16:9 (text prompt left, Agent Opus video right) */
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
          : null}
      </div>
    );

    const pillBg = { backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), linear-gradient(90deg, rgba(104, 104, 104, 0.4) 0%, rgba(104, 104, 104, 0.4) 100%)" };

    return (
      <div className="relative overflow-hidden bg-[#181818]" style={{ width: 1056, height: 594 }}>
        {/* ambient blurred backdrop keyed to the video */}
        {(() => { const __a = vids["slot1"]; return __a ? (__a.img
          ? <img src={__a.url} className="absolute inset-0 w-full h-full object-cover blur-[60px] opacity-30 scale-110 pointer-events-none" />
          : <video src={__a.url} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover blur-[60px] opacity-30 scale-110 pointer-events-none" />) : <div className="hidden" />; })()}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(130% 90% at 50% 118%, rgba(140,150,170,0.22), transparent 55%)" }} />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex gap-[24px] items-center">
          {/* prompt card */}
          <div className="relative w-[360px] h-[440px] rounded-[20px] bg-[#212124] border border-[#3a3a40] p-[26px] flex flex-col shrink-0">
            <div className="inline-flex items-center gap-[8px] self-start px-[12px] py-[9px] rounded-[8px]" style={pillBg}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff570a"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
              <p className="font-medium leading-none text-[14px] text-white tracking-[0.42px] uppercase font-[Geist,sans-serif]">Prompt</p>
            </div>
            <p className="mt-[22px] text-[#f0f0f2] text-[23px] leading-[1.4] font-medium tracking-[-0.1px] font-[Geist,sans-serif]">
              A cinematic product ad — slow-motion splash, studio lighting, ultra-detailed 4K.
            </p>
            <p className="mt-auto text-[13px] text-neutral-500 font-medium font-[Geist,sans-serif]">One prompt. One take.</p>
          </div>

          {/* arrow — editable text, so its colour/size can be restyled via the inspector */}
          <p className="shrink-0 w-[44px] text-center text-neutral-400 text-[40px] leading-none font-light font-[Geist,sans-serif]">→</p>

          {/* video card with Agent Opus label */}
          <div className="relative w-[520px] h-[440px] shrink-0">
            <Slot k="slot1" className="absolute inset-0 bg-[#a7aaab]" />
            <div data-pin data-swap="label1" className={"absolute top-[14px] left-[14px] flex items-center justify-center p-[10px] rounded-[8px]" + (window.__EDITOR ? "" : " pointer-events-none")} style={pillBg}>
              {labelText.label1 == null
                ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[24px] object-contain" />
                : <p className="font-medium leading-none text-[16px] text-center text-white tracking-[0.48px] uppercase whitespace-nowrap font-[Geist,sans-serif]">{labelText.label1}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({ id: "prompt-16x9", name: "Prompt to Video 16:9", width: 1056, height: 594, slots: 1, desc: "16:9 layout with an editable text prompt card on the left and an Agent Opus-labeled video on the right", Component });
})();
