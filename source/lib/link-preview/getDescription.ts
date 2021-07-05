import { metaTagContent } from "./getMetaTags";

export function getDescription(doc: cheerio.Root) {
  const description =
    metaTagContent(doc, `description`, `name`) ||
    metaTagContent(doc, `Description`, `name`) ||
    metaTagContent(doc, `og:description`, `property`);
  return description;
}
