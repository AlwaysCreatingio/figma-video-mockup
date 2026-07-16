/* Template product-1x1 — AI Product Ads 1:1 Comparison (square canvas variant of 3534-14453) */
(function () {
  function Component(props) {
    const { useState } = React;

    const [vids, setVids] = useState(() => (props && props.preload && props.preload.vids) || {});
    React.useEffect(() => { window.__slotAPI = { setVids }; return () => { window.__slotAPI = null; }; }, []);
    const [labelText, setLabelText] = useState(() => (props && props.preload && props.preload.labelText) || { label1: "BEFORE" });
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
      <div
        data-vslot={k} onClick={() => pick(k)}
        className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')}
        style={style}
      >
        {vids[k] ? (
          (vids[k].img ? <img src={vids[k].url} className="w-full h-full object-cover" /> : <video src={vids[k].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />)
        ) : (
          null
        )}
      </div>
    );

    const chipStyle = {
      backgroundImage:
        "linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), linear-gradient(90deg, rgba(104, 104, 104, 0.4) 0%, rgba(104, 104, 104, 0.4) 100%)"
    };

    return (
      <div className="relative overflow-hidden bg-[#101010]" style={{ width: 1080, height: 1080 }}>
        {/* Ambient blurred background mirroring the uploaded footage */}
        {(() => { const __a = vids["slot1"] || vids["slot2"]; return __a ? (__a.img
          ? <div className="hidden" />
          : <div className="hidden" />) : null; })()}

        {/* Centered content */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[32px] items-start w-[840px]"
          style={{ left: '50%', top: 'calc(50% - 28px)' }}
        >
          <div className="flex flex-col gap-[16px] items-start w-full">
            {/* Card 1 */}
            <div className="relative h-[472px] w-full">
              <Slot k="slot1" className="absolute inset-0 bg-[rgba(255,255,255,0.6)]" />
              <div data-pin data-swap="label1"
                className={"absolute top-[14px] left-[14px] flex items-center justify-center px-[16px] py-[9px] rounded-[12px]" + (window.__EDITOR ? "" : " pointer-events-none")}
                style={chipStyle}
              >
                {labelText.label1 === "@logo"
                  ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[30px] object-contain" />
                  : <p className="font-medium leading-none text-[24px] text-center text-white tracking-[0.72px] uppercase whitespace-nowrap font-[Geist,sans-serif]">{(labelText.label1 && labelText.label1 !== "@logo") ? labelText.label1 : "BEFORE"}</p>}
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative h-[472px] w-full">
              <Slot k="slot2" className="absolute inset-0 bg-[rgba(255,255,255,0.6)]" />
              <div data-pin data-swap="label2"
                className={"absolute top-[14px] left-[14px] flex items-center justify-center px-[16px] py-[9px] rounded-[12px]" + (window.__EDITOR ? "" : " pointer-events-none")}
                style={chipStyle}
              >
                {labelText.label2 === "@logo"
                  ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[30px] object-contain" />
                  : <p className="font-medium leading-none text-[24px] text-center text-white tracking-[0.72px] uppercase whitespace-nowrap font-[Geist,sans-serif]">{(labelText.label2 && labelText.label2 !== "@logo") ? labelText.label2 : "AFTER"}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* brand logo at the bottom of the canvas */}
        <img src={window.__AO_LOGO} alt="Agent Opus" className="invert absolute left-1/2 -translate-x-1/2 bottom-[42px] h-[36px] object-contain" />
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({
    id: "product-1x1",
    name: "AI Product Ads 1:1 Comparison",
    width: 1080,
    height: 1080,
    slots: 2,
    desc: "Square 1:1 ad template comparing two labeled video cards over a blurred backdrop.",
    Component
  });
})();
