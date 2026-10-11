export function isolateModal(surface: HTMLElement, allowed: HTMLElement[] = []) {
  const changed: HTMLElement[] = [];
  let current: HTMLElement | null = surface;
  while (current?.parentElement) {
    for (const sibling of Array.from(current.parentElement.children)) {
      if (sibling === current || !(sibling instanceof HTMLElement) || sibling.tagName === "SCRIPT" || allowed.includes(sibling) || sibling.inert) continue;
      sibling.inert = true;
      changed.push(sibling);
    }
    current = current.parentElement;
    if (current === document.body) break;
  }
  const overflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  return () => { changed.forEach((el) => { el.inert = false; }); document.body.style.overflow = overflow; };
}
