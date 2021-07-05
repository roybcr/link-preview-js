import { metaTag } from "./getMetaTags";
import { resolve } from "../../core/resolveURL";
export function getImages(
  doc: cheerio.Root,
  rootUrl: string,
  imagesPropertyType?: string
) {
  let images: string[] = [];
  let nodes: cheerio.Cheerio | null;
  let src: string | undefined;
  let dic: Record<string, boolean> = {};

  const imagePropertyType = imagesPropertyType ?? `og`;
  nodes =
    metaTag(doc, `${imagePropertyType}:image`, `property`) ||
    metaTag(doc, `${imagePropertyType}:image`, `name`);

  if (nodes) {
    nodes.each((_: number, node: cheerio.Element) => {
      if (node.type === `tag`) {
        src = node.attribs.content;
        if (src) {
          src = resolve(rootUrl, src);
          images.push(src);
        }
      }
    });
  }

  if (images.length <= 0 && !imagesPropertyType) {
    src = doc(`link[rel=image_src]`).attr(`href`);
    if (src) {
      src = resolve(rootUrl, src);
      images = [src];
    } else {
      nodes = doc(`img`);

      if (nodes?.length) {
        dic = {};
        images = [];
        nodes.each((_: number, node: cheerio.Element) => {
          if (node.type === `tag`) src = node.attribs.src;
          if (src && !dic[src]) {
            dic[src] = true;
            // width = node.attribs.width;
            // height = node.attribs.height;
            images.push(resolve(rootUrl, src));
          }
        });
      }
    }
  }

  return images;
}
