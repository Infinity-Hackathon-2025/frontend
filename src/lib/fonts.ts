import localFont from "next/font/local";

// export const mont = localFont({
//   src: '../fonts/chido/Chido-Heading.otf',
//   display: 'swap',
//   variable: '--font-chido',
//   fallback: ['sans-serif'],
// });

export const mont = localFont({
  src: [
    {
      path: "../fonts/mont/Mont-Heavy.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/mont/Mont-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-mont",
  fallback: ["sans-serif"],
});

export const nexa = localFont({
  src: [
    {
      path: "../fonts/nexa/Nexa-Heavy.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/nexa/Nexa-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-nexa",
  fallback: ["sans-serif"],
});
