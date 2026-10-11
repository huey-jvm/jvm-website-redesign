export function TitleFigures({ children }: { children: string }) {
  return children.split(/(\d[\d:.,/-]*)/g).map((part, i) => /\d/.test(part) ? <span key={i} className="font-sans font-medium tabular" data-figure>{part}</span> : part);
}
