import urlObj from "url";

// returns default favicon (//hostname/favicon.ico) for a url
export function getDefaultFavicon ( rootUrl: string ) {
  return urlObj.resolve( rootUrl, `/favicon.ico` );
}
