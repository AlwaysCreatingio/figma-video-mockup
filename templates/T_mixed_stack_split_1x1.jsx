/* Template mixed-stack-split-1x1 — Mixed Stack Split 1:1 (9:16 video on the left, two 16:9 videos stacked on the right, Agent Opus wordmark) */
(function () {
  function Component(props) {
    const { useState } = React;

    const [vids, setVids] = useState(() => (props && props.preload && props.preload.vids) || {});
    React.useEffect(() => { window.__slotAPI = { setVids }; return () => { window.__slotAPI = null; }; }, []);
    const [labelText, setLabelText] = useState(() => (props && props.preload && props.preload.labelText) || {});
    React.useEffect(() => { if (window.__slotAPI) window.__slotAPI.setLabelText = setLabelText; }, []);
    React.useEffect(() => { if (window.__slotAPI) window.__slotAPI.labelText = labelText; }, [labelText]);
    const pick = k => { const i=document.createElement('input'); i.type='file'; i.accept='video/*,image/*'; i.onchange=e=>{const f=e.target.files[0]; if(f) setVids(v=>({...v,[k]:{url:URL.createObjectURL(f),img:(f.type||"").startsWith("image")}}));}; i.style.cssText='position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0'; document.body.appendChild(i); i.addEventListener('change',function(){setTimeout(function(){i.remove();},0);},{once:true}); i.click(); };
    const Slot = ({ k, className, style }) => (
      <div data-vslot={k} onClick={() => pick(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={style}>
        {vids[k] ? (vids[k].img ? <img src={vids[k].url} className="w-full h-full object-cover" /> : <video src={vids[k].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />)
        : null}
      </div>
    );

    return (
      <div className="relative overflow-hidden bg-[#0f0f13]" style={{ width: 1080, height: 1080 }}>
        <div className="hidden" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[26px]">
          {/* row: 9:16 result on the left, two 16:9 results stacked on the right */}
          <div className="flex items-center gap-[26px]">
            {/* left: the 9:16 result */}
            <Slot k="slot1" className="w-[304px] h-[540px] rounded-[22px] bg-[#9f9f9f]" />
            {/* right: two 16:9 results stacked */}
            <div className="flex flex-col gap-[26px]">
              <Slot k="slot2" className="w-[456px] h-[257px] rounded-[22px] bg-[#8f8f8f]" />
              <Slot k="slot3" className="w-[456px] h-[257px] rounded-[22px] bg-[#7f7f7f]" />
            </div>
          </div>
          {/* brand: Agent Opus wordmark */}
          <div data-swap="brand" className="flex items-center justify-center h-[40px]">
            {(labelText.brand == null || labelText.brand === "@logo")
              ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-full object-contain" />
              : <p className="font-bold leading-none text-[30px] text-[#f3ede2] font-[Geist,sans-serif] whitespace-nowrap">{labelText.brand}</p>}
          </div>
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({ id: "mixed-stack-split-1x1", name: "Mixed Stack Split 1:1", width: 1080, height: 1080, slots: 3, desc: "Square layout: a 9:16 clip on the left with two 16:9 clips stacked on the right, and the Agent Opus wordmark underneath.", Component });
})();
