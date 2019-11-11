export interface PhotoSize {
  readonly url: string;
  readonly width: number;
  readonly height: number;
}

export interface Photo {
  readonly id: string;
  readonly title: string;
  readonly sizes: readonly PhotoSize[];
}

export default interface FlickrService {
  searchPhotos(
    this: this,
    searchText: string,
    signal?: AbortSignal,
  ): PromiseLike<readonly Photo[]>;
}
