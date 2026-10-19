window.hairlineFigures = window.hairlineFigures || {};
window.hairline = (figure) => { window.hairlineFigures[figure.name] = figure; };
window.hairlineMount = (stage, name, out) => {
  const figure = window.hairlineFigures[name];
  if (!figure) return null;
  HL.inject(document);
  stage.setAttribute("data-hairline", figure.name);
  const svg = HL.mk("svg", { viewBox: "0 0 400 320", "aria-hidden": "true" }, stage);
  const read = {
    get textContent() { return out ? out.textContent : ""; },
    set textContent(value) { if (out) out.textContent = value == null ? "" : String(value); },
  };
  const handle = figure.mount({ stage, svg, read }, figure.range[1]);
  if (out && !out.textContent) out.textContent = "rest";
  return { set: handle.set, destroy: () => { handle.destroy(); svg.remove(); } };
};
