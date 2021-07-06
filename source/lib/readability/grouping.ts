export const reject = new Set([
  'applet',
  'canvas',
  'embed',
  'frame',
  'frameset',
  'head',
  'iframe',
  'link',
  'meta',
  'noembed',
  'noframes',
  'noscript',
  'object',
  'param',
  'script',
  'style',
  'template'
]);

export const av = new Set(['audio', 'figcaption', 'figure', 'picture', 'source', 'track', 'video']);

export const block = new Set([
  'address',
  'article',
  'aside',
  'blockquote',
  'div',
  'figcaption',
  'figure',
  'footer',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hgroup',
  'li',
  'main',
  'nav',
  'p',
  'pre',
  'section'
]);

export const selfClosing = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]);

export const heading = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'title']);

export const hyper = new Set(['button', 'option']);

export const bad = new Set(['footer', 'textarea']);
