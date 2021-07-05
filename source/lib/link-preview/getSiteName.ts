import { metaTagContent } from "./getMetaTags";

export function getSiteName ( doc: cheerio.Root ) {
  const siteName = metaTagContent( doc, `og:site_name`, `property` ) ||
    metaTagContent( doc, `og:site_name`, `name` );
  return siteName;
}
