export const metaTag = (doc: cheerio.Root, type: string, attr: string) => {
  const nodes = doc(`meta[${attr}='${type}']`);
  return nodes.length ? nodes : null;
};

export const metaTagContent = (doc: cheerio.Root, type: string, attr: string) =>
  doc(`meta[${attr}='${type}']`).attr(`content`);
export function getTitle(doc: cheerio.Root) {
  let title =
    metaTagContent(doc, `og:title`, `property`) ||
    metaTagContent(doc, `og:title`, `name`);
  if (!title) {
    title = doc(`title`).text();
  }
  return title;
}
