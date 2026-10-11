export const formatList = (items: readonly string[]) => new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(items);
