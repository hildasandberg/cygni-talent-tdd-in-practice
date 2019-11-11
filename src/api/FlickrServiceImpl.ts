import FlickrService, { Photo } from './FlickrService';
import FlickrError from './FlickrError';

const SIZES = ['t', 'n', 'm', 'z', 'c', 'l', 'o'] as const;
const EXTRAS = SIZES.map(size => `url_${size}`).join(',');

export default class FlickrServiceImpl implements FlickrService {
  constructor(private readonly apiKey: string) {}

  async searchPhotos(
    searchText: string,
    signal?: AbortSignal,
  ): Promise<readonly Photo[]> {
    const result = await this.flickr(
      'flickr.photos.search',
      {
        text: searchText,
        sort: 'relevance',
        safe_search: '1',
        page: '1',
        extras: EXTRAS,
      },
      { signal },
    );

    return result.photos.photo.map((photo: any) => ({
      id: photo.id,
      title: photo.title,
      sizes: SIZES.filter(size => `url_${size}` in photo)
        .map(size => ({
          url: photo[`url_${size}`],
          width: Number.parseInt(photo[`width_${size}`], 10),
          height: Number.parseInt(photo[`height_${size}`], 10),
        }))
        .sort((a, b) => a.width - b.width),
    }));
  }

  private async flickr(
    method: string,
    params: Record<string, string> = {},
    options?: RequestInit,
  ) {
    const url = new URL('https://api.flickr.com/services/rest');

    url.searchParams.set('method', method);
    url.searchParams.set('api_key', this.apiKey);
    url.searchParams.set('format', 'json');
    url.searchParams.set('nojsoncallback', '1');

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }

    const request = new Request(url.href, { ...options, method: 'GET' });

    const response = await fetch(request);
    const data = await response.json();

    if (data.stat !== 'ok') {
      throw new FlickrError(data.code, data.message);
    }

    return data;
  }
}
