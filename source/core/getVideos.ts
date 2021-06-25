import { metaTagContent, metaTag } from "./getMetaTags";

export function getVideos(doc: cheerio.Root) {
  const videos = [];
  let nodeTypes;
  let nodeSecureUrls;
  let nodeType;
  let nodeSecureUrl;
  let video;
  let videoType;
  let videoSecureUrl;
  let width;
  let height;
  let videoObj;
  let index;

  const nodes =
    metaTag(doc, `og:video`, `property`) || metaTag(doc, `og:video`, `name`);

  if (nodes?.length) {
    nodeTypes =
      metaTag(doc, `og:video:type`, `property`) ||
      metaTag(doc, `og:video:type`, `name`);
    nodeSecureUrls =
      metaTag(doc, `og:video:secure_url`, `property`) ||
      metaTag(doc, `og:video:secure_url`, `name`);
    width =
      metaTagContent(doc, `og:video:width`, `property`) ||
      metaTagContent(doc, `og:video:width`, `name`);
    height =
      metaTagContent(doc, `og:video:height`, `property`) ||
      metaTagContent(doc, `og:video:height`, `name`);

    for (index = 0; index < nodes.length; index += 1) {
      const node = nodes[index];
      if (node.type === `tag`) video = node.attribs.content;

      nodeType = nodeTypes![index];
      if (nodeType.type === `tag`)
        videoType = nodeType ? nodeType.attribs.content : null;

      nodeSecureUrl = nodeSecureUrls![index];
      if (nodeSecureUrl.type === `tag`)
        videoSecureUrl = nodeSecureUrl ? nodeSecureUrl.attribs.content : null;

      videoObj = {
        url: video,
        secureUrl: videoSecureUrl,
        type: videoType,
        width,
        height,
      };
      if (videoType && videoType.indexOf(`video/`) === 0) {
        videos.splice(0, 0, videoObj);
      } else {
        videos.push(videoObj);
      }
    }
  }

  return videos;
}
