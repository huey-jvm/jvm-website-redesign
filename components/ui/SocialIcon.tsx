export function SocialIcon({ name }: { name: string }) {
  return <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="size-6">
    {name === "Facebook" ? <path d="M14 21V13H17L18 9H14V6C14 5 15 4 17 4H19V1H16C12 1 10 3 10 6V9H7V13H10V21" /> : <><rect x="3" y="8" width="4" height="13" /><path d="M11 21V8H15V10C17 6 21 8 21 12V21H17V13C17 10 15 10 15 13V21" /><circle cx="5" cy="3" r="2" /></>}
  </svg>;
}
