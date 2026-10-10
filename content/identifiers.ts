export const identifiers = {
  uei: "CCLDP2LPGKN4",
  cage: "7XJ94",
  naicsPrimary: "541512",
  naicsSecondary: ["541511", "541513", "541519", "518210"],
  setAsides: ["SBA 8(a)", "EDWOSB", "SDVOSB", "HUBZone"],
  samStatus: "Active registration",
} as const;

export const naicsDescriptions: Record<string, string> = {
  "541512": "Computer Systems Design Services",
  "541511": "Custom Computer Programming Services",
  "541513": "Computer Facilities Management Services",
  "541519": "Other Computer Related Services",
  "518210": "Computing Infrastructure Providers, Data Processing, Web Hosting and Related Services",
};
