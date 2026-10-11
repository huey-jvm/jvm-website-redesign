export function breakableEmail(address: string) {
  const at = address.indexOf("@");
  return at < 0 ? address : <>{address.slice(0, at)}<wbr />{address.slice(at)}</>;
}
