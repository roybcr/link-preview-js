import { resolve } from "../../core/resolveURL";
import { getDefaultFavicon } from "./getDefaultFavicon";

// returns an array of URL's to favicon images
export function getFavicons(doc: cheerio.Root, rootUrl: string) {
  const images = [];
  let nodes: cheerio.Cheerio | never[] = [];
  let src: string | undefined;

  const relSelectors = [
    `rel=icon`,
    `rel="shortcut icon"`,
    `rel=apple-touch-icon`,
  ];

  relSelectors.forEach((relSelector) => {
    // look for all icon tags
    nodes = doc(`link[${relSelector}]`);

    // collect all images from icon tags
    if (nodes.length) {
      nodes.each((_: number, node: cheerio.Element) => {
        if (node.type === `tag`) src = node.attribs.href;
        if (src) {
          src = resolve(rootUrl, src);
          images.push(src);
        }
      });
    }
  });

  // if no icon images, use default favicon location
  if (images.length <= 0) {
    images.push(getDefaultFavicon(rootUrl));
  }

  return images;
}
