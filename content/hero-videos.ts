export type HeroVideo = {
  src: string;
  mobileSrc: string;
  poster: string;
  description: string;
};

export const landingVideo: HeroVideo = {
  src: "/videos/landing.mp4",
  mobileSrc: "/videos/landing-mobile.mp4",
  poster: "/images/video/landing-poster.webp",
  description: "Margie Johnson and the JVM team walking together outdoors",
};

export const aboutVideo: HeroVideo = {
  src: "/videos/about-jvm-32eef00a.mp4",
  mobileSrc: "/videos/about-jvm-32eef00a-mobile.mp4",
  poster: "/images/video/about-jvm-poster.webp",
  description: "The JVM team together in their Success Begins With the Right Team shirts",
};
