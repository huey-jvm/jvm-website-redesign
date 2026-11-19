export type HeroVideo = {
  src: string;
  mobileSrc: string;
  poster: string;
  description: string;
};

export const landingVideo: HeroVideo = {
  src: "/videos/landing-58adf9d2.mp4",
  mobileSrc: "/videos/landing-58adf9d2-mobile.mp4",
  poster: "/images/video/landing-poster.webp",
  description: "Margie Johnson and the JVM team walking together through a bright office",
};

export const aboutVideo: HeroVideo = {
  src: "/videos/about-jvm-32eef00a.mp4",
  mobileSrc: "/videos/about-jvm-32eef00a-mobile.mp4",
  poster: "/images/video/about-jvm-poster.webp",
  description: "The JVM team together in their Success Begins With the Right Team shirts",
};
