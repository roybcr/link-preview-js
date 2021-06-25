import cheerio from "cheerio";
import { CONSTANTS } from "../constants";
import { getTitle } from "./getMetaTags";
import { getSiteName } from "./getSiteName";
import { getDescription } from "./getDescription";
import { getMediaType } from "./getMediaType";
import { getImages } from "./getImages";
import { getVideos } from "./getVideos";
import { getDefaultFavicon } from "./getDefaultFavicon";
import { getFavicons } from "./getFavicons";

function parseImageResponse(url: string, contentType: string) {
  return {
    url,
    mediaType: `image`,
    contentType,
    favicons: [getDefaultFavicon(url)],
  };
}

function parseAudioResponse(url: string, contentType: string) {
  return {
    url,
    mediaType: `audio`,
    contentType,
    favicons: [getDefaultFavicon(url)],
  };
}

function parseVideoResponse(url: string, contentType: string) {
  return {
    url,
    mediaType: `video`,
    contentType,
    favicons: [getDefaultFavicon(url)],
  };
}

function parseApplicationResponse(url: string, contentType: string) {
  return {
    url,
    mediaType: `application`,
    contentType,
    favicons: [getDefaultFavicon(url)],
  };
}

function parseTextResponse(
  body: string,
  url: string,
  options: ILinkPreviewOptions = {},
  contentType?: string
) {
  const doc = cheerio.load(body);

  return {
    url,
    title: getTitle(doc),
    siteName: getSiteName(doc),
    description: getDescription(doc),
    mediaType: getMediaType(doc) || `website`,
    contentType,
    images: getImages(doc, url, options.imagesPropertyType),
    videos: getVideos(doc),
    favicons: getFavicons(doc, url),
  };
}

function parseUnknownResponse(
  body: string,
  url: string,
  options: ILinkPreviewOptions = {},
  contentType?: string
) {
  return parseTextResponse(body, url, options, contentType);
}

export function parseResponse(
  response: IPrefetchedResource,
  options?: ILinkPreviewOptions
) {
  try {
    let contentType = response.headers[`content-type`];

    if (contentType?.indexOf(`;`)) {
      contentType = contentType.split(`;`)[0];
    }

    if (!contentType) {
      return parseUnknownResponse(response.data, response.url, options);
    }

    if ((contentType as any) instanceof Array) {
      contentType = contentType[0];
    }

    if (CONSTANTS.REGEX_CONTENT_TYPE_IMAGE.test(contentType)) {
      return parseImageResponse(response.url, contentType);
    }
    if (CONSTANTS.REGEX_CONTENT_TYPE_AUDIO.test(contentType)) {
      return parseAudioResponse(response.url, contentType);
    }
    if (CONSTANTS.REGEX_CONTENT_TYPE_VIDEO.test(contentType)) {
      return parseVideoResponse(response.url, contentType);
    }
    if (CONSTANTS.REGEX_CONTENT_TYPE_TEXT.test(contentType)) {
      const htmlString = response.data;
      return parseTextResponse(htmlString, response.url, options, contentType);
    }
    if (CONSTANTS.REGEX_CONTENT_TYPE_APPLICATION.test(contentType)) {
      return parseApplicationResponse(response.url, contentType);
    }
    const htmlString = response.data;
    return parseUnknownResponse(htmlString, response.url, options);
  } catch (e) {
    throw new Error(
      `link-preview-js could not fetch link information ${e.toString()}`
    );
  }
}
