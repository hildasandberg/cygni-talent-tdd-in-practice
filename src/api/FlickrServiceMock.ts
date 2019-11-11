import FlickrService, { Photo } from './FlickrService';

function delay(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export default class FlickrServiceMock implements FlickrService {
  async searchPhotos(): Promise<readonly Photo[]> {
    await delay(500);
    return [];
  }
}
