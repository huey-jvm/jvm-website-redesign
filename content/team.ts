import { contact } from "./contact";

export const leadershipTeamPhoto = { src: "/images/revision/team-shirts.webp", alt: "JVM colleagues together in branded team shirts", position: "object-center" };

export const teamPhoto = {
  src: "/images/revision/team-walking.webp",
  alt: "The JVM Solutions team walking together outdoors",
  position: "object-[70%_center]",
};

export const teamShirtsPhoto = { src: "/images/jvm/team-shirts.webp", alt: "The JVM Solutions team together in company shirts" };

export const team = [
  {
    slug: "margie-johnson",
    name: "Margie Johnson",
    role: "CEO and President",
    note: "United States Air Force veteran",
    image: "/images/revision/margie.webp",
    summary: "is a United States Air Force veteran with 18 years inside the Department of Defense environment as a contracting officer, logistician, project manager and acquisition liaison.",
    bio: [
      "Ms. Johnson brings 18 years of experience focused exclusively within the Department of Defense environment, and in so doing has developed solid operational and functional expertise serving in various cleared positions as Contracting Officer, Logistician, Team Lead, Project Manager and Air Force Acquisition Liaison. Her professional emphasis has been on resource management and senior staff positions for the optimisation of Air Force enterprise information technology and logistics assets, in both government and private industry.",
      "Ms. Johnson is an alumna of Tuskegee University, where she earned her Bachelor's degree in Sales and Marketing, and holds a Master's degree in Business Administration with a concentration in Management from Troy State University. She has a proven track record of strong business acumen, professionalism and delivering on her promises within the federal market. She also founded Gold, Diamonds and Pearls, Inc., a non-profit organisation that mentors young girls to fulfil their highest potential through excellence, leadership and service.",
    ],
    contactRoute: contact.emails.bd,
  },
  // First names supplied by the user; full public names and roles remain pending.
  ...[
    { slug: "deja", name: "Deja", image: "/images/revision/deja.webp" },
    { slug: "jennifer", name: "Jennifer", image: "/images/revision/jennifer.webp" },
    { slug: "les", name: "Les", image: "/images/revision/les.webp" },
  ].map(person => ({ ...person, role: "", note: undefined, summary: undefined, bio: [] as string[], contactRoute: contact.emails.general })),
];
