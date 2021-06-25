import { fetch } from "cross-fetch";
import { CONSTANTS } from "./constants";
import { parseResponse } from "./core/parseResponse";

/**
 * Parses the text, extracts the first link it finds and does a HTTP request
 * to fetch the website content, afterwards it tries to parse the internal HTML
 * and extract the information via meta tags
 * @param text string, text to be parsed
 * @param options ILinkPreviewOptions
 */
interface ILinkPreviewOptions {
  headers?: Record<string, string>;
  imagesPropertyType?: string;
  proxyUrl?: string;
}

interface IPrefetchedResource {
  headers: Record<string, string>;
  status?: number;
  imagesPropertyType?: string;
  proxyUrl?: string;
  url: string;
  data: string;
}
export async function getLinkPreview(
  text: string,
  options?: ILinkPreviewOptions
) {
  console.log("Getting link preview for ", text);
  if (!text || typeof text !== `string`) {
    throw new Error(`link-preview-js did not receive a valid url or text`);
  }

  const detectedUrl = text
    .replace(/\n/g, ` `)
    .split(` `)
    .find((token) => CONSTANTS.REGEX_VALID_URL.test(token));

  if (!detectedUrl) {
    throw new Error(`link-preview-js did not receive a valid a url or text`);
  }

  const fetchOptions = {
    headers: options?.headers ?? {},
    redirect: `follow` as `follow`,
  };

  const fetchUrl = options?.proxyUrl
    ? options.proxyUrl.concat(detectedUrl)
    : detectedUrl;

  const response = await fetch(fetchUrl, fetchOptions);

  const headers: Record<string, string> = {};
  response.headers.forEach((header, key) => {
    headers[key] = header;
  });

  const normalizedResponse: IPrefetchedResource = {
    url: options?.proxyUrl
      ? response.url.replace(options.proxyUrl, ``)
      : response.url,
    headers,
    data: await response.text(),
  };

  return parseResponse(normalizedResponse, options);
}

/**
 * Skip the library fetching the website for you, instead pass a response object
 * from whatever source you get and use the internal parsing of the HTML to return
 * the necessary information
 * @param response Preview Response
 * @param options IPreviewLinkOptions
 */
export async function getPreviewFromContent(
  response: IPrefetchedResource,
  options?: ILinkPreviewOptions
) {
  if (!response || typeof response !== `object`) {
    throw new Error(`link-preview-js did not receive a valid response object`);
  }

  if (!response.url) {
    throw new Error(`link-preview-js did not receive a valid response object`);
  }

  return parseResponse(response, options);
}
