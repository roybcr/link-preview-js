import { resolve } from '../../core/resolveURL';

// returns default favicon (//hostname/favicon.ico) for a url
export function getDefaultFavicon(rootUrl: string) {
  return resolve(rootUrl, `/favicon.ico`);
}
