import { metaTagContent } from "./getMetaTags";

export function getAuthor(doc: cheerio.Root) {
  const author =
    metaTagContent(doc, `author`, `name`) ||
    metaTagContent(doc, `Author`, `name`) ||
    metaTagContent(doc, `og:author`, `property`);
  return author;
}
