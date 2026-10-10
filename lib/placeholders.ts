/**
 * Placeholders are visible in development and in any build where NEXT_PUBLIC_SHOW_PLACEHOLDERS is "true"
 * (set that on the Vercel preview environment). They are never visible in a production build by default.
 */
export const showPlaceholders =
  process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true" || process.env.NODE_ENV !== "production";
