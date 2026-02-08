const GOOGLE_FONTS_CSS =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;800&display=swap";

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: number;
  style: "normal";
};

let cachedFonts: Promise<OgFont[]> | null = null;

export async function loadMontserratFonts() {
  if (cachedFonts) return cachedFonts;

  cachedFonts = (async () => {
    const css = await fetch(GOOGLE_FONTS_CSS, {
      cache: "force-cache",
    }).then((res) => res.text());

    const fontFaceRegex =
      /@font-face\s*{[^}]*font-weight:\s*(\d+)[^}]*src:\s*url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g;

    const matches = [...css.matchAll(fontFaceRegex)];

    const fonts: OgFont[] = await Promise.all(
      matches.map(async (m) => {
        const weight = Number(m[1]);
        const url = m[2];

        const data = await fetch(url, {
          cache: "force-cache",
        }).then((res) => res.arrayBuffer());

        return {
          name: "Montserrat",
          data,
          weight,
          style: "normal",
        };
      }),
    );

    return fonts;
  })();

  return cachedFonts;
}
