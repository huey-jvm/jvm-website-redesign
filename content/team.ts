import { starsIII, starsShown } from "./vehicles";
import { contact } from "./contact";

export const teamPhoto = {
  src: "/images/team/team-walking.jpg",
  alt: "The JVM Solutions team walking together outside their office",
  position: "object-[70%_center]",
};

export const teamShirtsPhoto = { src: "/images/team/team-shirts.jpg", alt: "The JVM Solutions team together in company shirts" };

export const team = [
  {
    slug: "margie-johnson",
    name: "Margie Johnson",
    role: "CEO and President",
    note: "United States Air Force veteran",
    image: "/images/team/founder-portrait.jpg",
    summary: "is a United States Air Force veteran with 18 years inside the Department of Defense environment as a contracting officer, logistician, project manager and acquisition liaison.",
    bio: [
      "Ms. Johnson brings 18 years of experience focused exclusively within the Department of Defense environment, and in so doing has developed solid operational and functional expertise serving in various cleared positions as Contracting Officer, Logistician, Team Lead, Project Manager and Air Force Acquisition Liaison. Her professional emphasis has been on resource management and senior staff positions for the optimisation of Air Force enterprise information technology and logistics assets, in both government and private industry.",
      "Ms. Johnson is an alumna of Tuskegee University, where she earned her Bachelor's degree in Sales and Marketing, and holds a Master's degree in Business Administration with a concentration in Management from Troy State University. She has a proven track record of strong business acumen, professionalism and delivering on her promises within the federal market. She also founded Gold, Diamonds and Pearls, Inc., a non-profit organisation that mentors young girls to fulfil their highest potential through excellence, leadership and service.",
    ],
    contactRoute: contact.emails.bd,
  },
  {
    slug: "roy-white",
    name: "Roy White",
    role: starsShown ? "Chief Technology Officer and 8(a) STARS III Program Manager" : "Chief Technology Officer",
    note: undefined,
    image: undefined,
    summary: undefined,
    bio: [],
    contactRoute: starsShown ? starsIII.jvmEmail : contact.emails.bd,
  },
];
