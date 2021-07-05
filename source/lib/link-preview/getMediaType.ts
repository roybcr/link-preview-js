import { metaTagContent, metaTag } from "./getMetaTags";

export function getMediaType(doc: cheerio.Root) {
  const node = metaTag(doc, `medium`, `name`);
  if (node) {
    const content = node.attr(`content`);
    return content === `image` ? `photo` : content;
  }

  return (
    metaTagContent(doc, `og:type`, `property`) ||
    metaTagContent(doc, `og:type`, `name`)
  );
}
