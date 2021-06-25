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
