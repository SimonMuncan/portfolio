// Shared scroll state, read by both ScrollRig (camera path) and SceneCanvas
// (fade-out). Anchored to the actual DOM position of the Act 4 boundary
// (#about, the first flat "ground" block) rather than a fixed fraction of
// total document height — Act 4's real content length varies with copy, so a
// fixed-fraction fade broke as soon as Act 4 grew past the brief's rough vh
// estimate.

export const scrollState = {
  y: 0, // raw scroll position in px
  act4Top: Infinity, // measured px offset of the Act 4 boundary
}

export function measureAct4Top() {
  const el = document.getElementById('about')
  scrollState.act4Top = el ? el.getBoundingClientRect().top + window.scrollY : Infinity
}
