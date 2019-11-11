export default class FlickrError extends Error {
  constructor(readonly code: string, message: string) {
    super(message);
  }
}
