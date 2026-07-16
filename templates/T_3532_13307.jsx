/* Template 3532-13307 — 9:16 Raw Footage vs Agent Opus */
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

    const pillBg = { backgroundImage: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6))" };

    return (
      <div className="relative overflow-hidden bg-[#181818]" style={{ width: 594, height: 1056 }}>
        {/* ambient blurred backdrop keyed to first video */}
        {(() => { const __a = (vids["slot1"] || vids["slot2"]); return __a ? (__a.img ? <div className="hidden" /> : <div className="hidden" />) : <div className="hidden" />; })()}

        {/* Raw footage card (gray, behind) */}
        <div className="absolute rounded-[20px]" style={{ left: 40, top: 321.53, width: 232.276, height: 412.94 }}>
          <Slot k="slot1" className="absolute inset-0 bg-[#7a7a7a] " />
          <div data-pin data-swap="label1" className="absolute flex items-center justify-center px-[11.845px] py-[7px] rounded-[9.476px]" style={{ left: 11.055, top: 11.055, ...pillBg }}>
            {labelText.label1 === "@logo"
              ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[30px] object-contain" />
              : <p className="font-medium leading-none text-[18.952px] text-center text-white tracking-[0.5685px] uppercase whitespace-nowrap font-[Geist,sans-serif]">{(labelText.label1 && labelText.label1 !== "@logo") ? labelText.label1 : "raw footage"}</p>}
          </div>
        </div>

        {/* Agent opus card (white, on top) */}
        <div className="absolute rounded-[20px]" style={{ left: 250, top: 266.53, width: 294.15, height: 522.94 }}>
          <Slot k="slot2" className="absolute inset-0 bg-white " />
          <div data-pin data-swap="label2" className="absolute flex items-center justify-center px-[15px] py-[9px] rounded-[12px]" style={{ left: 14, top: 14, ...pillBg }}>
            {(labelText.label2 === "@logo" || labelText.label2 == null)
              ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[30px] object-contain" />
              : <p className="font-medium leading-none text-[18.952px] text-center text-white tracking-[0.5685px] uppercase whitespace-nowrap font-[Geist,sans-serif]">{labelText.label2 || "AGENT OPUS"}</p>}
          </div>
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({ id: "3532-13307", name: "Raw Footage vs Agent Opus", width: 594, height: 1056, slots: 2, desc: "9:16 dual phone-card comparison with two video slots", Component });
})();
