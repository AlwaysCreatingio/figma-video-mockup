/* Template agent-showcase-9x16 — Agent Showcase 9:16 */
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

    const Wordmark = ({ swap }) => {
      const v = labelText[swap];
      return (
        <div data-swap={swap} className="flex items-center justify-center h-[72px]">
          {(v == null || v === "@logo")
            ? <span className="inline-flex items-center gap-[10px]" style={{ color: "#ffffff" }}>
                <svg aria-label="agent opus logo" fill="currentColor" viewBox="0 0 24 24" width="52" height="52"><path d="M3.81659 11.9633C3.83636 7.46057 7.49262 3.81651 12 3.81651C16.5196 3.81651 20.1835 7.48039 20.1835 12C20.1835 16.5196 16.5196 20.1835 12 20.1835C11.4083 20.1835 10.8313 20.1207 10.2752 20.0014V23.877C10.8385 23.958 11.4143 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12V23.9633H3.81651C3.81651 23.9633 3.81659 17.1939 3.81659 12.6C3.81659 12.5076 3.81659 11.9633 3.81659 11.9633Z"></path><path d="M5.13761 11.9948V24H8.95413L8.95429 12.76V11.9633C8.97119 10.3004 10.3264 8.95413 12 8.95413C13.6841 8.95413 15.0459 10.3174 15.0459 11.9948C15.0459 13.6721 13.6841 15.0354 12 15.0354C11.3594 15.0354 10.7654 14.8381 10.2752 14.5013V18.6335C10.8264 18.776 11.4044 18.8519 12 18.8519C15.7881 18.8519 18.8624 15.7838 18.8624 11.9948C18.8624 8.20576 15.7881 5.13761 12 5.13761C8.21192 5.13761 5.13761 8.20576 5.13761 11.9948Z"></path></svg>
                <span className="text-[54px] font-bold leading-none tracking-[-0.5px] font-[Geist,sans-serif] whitespace-nowrap">Agent Opus</span>
              </span>
            : <p className="font-bold leading-none text-[52px] text-white text-center tracking-[-0.4px] font-[Geist,sans-serif] whitespace-nowrap">{v}</p>}
        </div>
      );
    };

    return (
      <div className="relative overflow-hidden bg-black" style={{ width: 1080, height: 1920 }}>
        <div className="hidden" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[980px]">
          {Wordmark({ swap: "title" })}
          <Slot k="slot1" className="mt-[48px] w-full h-[551px] bg-[#9f9f9f]" />
          <div className="mt-[40px] flex gap-[24px] w-full">
            <Slot k="slot2" className="flex-1 h-[270px] bg-[#8f8f8f] rounded-[12px]" />
            <Slot k="slot3" className="flex-1 h-[270px] bg-[#8f8f8f] rounded-[12px]" />
          </div>
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({
    id: "agent-showcase-9x16",
    name: "Agent Showcase 9:16",
    width: 1080,
    height: 1920,
    slots: 3,
    desc: "Vertical reel on black: Agent Opus wordmark above a hero clip, with two supporting clips side by side underneath.",
    Component
  });
})();
