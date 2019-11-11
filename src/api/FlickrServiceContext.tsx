import React, { createContext, useContext } from 'react';
import FlickrService from './FlickrService';
import FlickrServiceMock from './FlickrServiceMock';

const FlickrServiceContext = createContext<FlickrService>(
  new FlickrServiceMock(),
);

export interface FlickrServiceProviderProps {
  flickrService: FlickrService;
  children: React.ReactNode;
}

export function FlickrServiceProvider({
  flickrService,
  children,
}: FlickrServiceProviderProps) {
  return (
    <FlickrServiceContext.Provider value={flickrService}>
      {children}
    </FlickrServiceContext.Provider>
  );
}

export function useFlickrService() {
  return useContext(FlickrServiceContext);
}

export default FlickrServiceContext;
