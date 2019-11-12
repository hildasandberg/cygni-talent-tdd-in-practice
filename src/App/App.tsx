import React, { useCallback, useState } from 'react';

import { useFlickrService } from '../api/FlickrServiceContext';
import { useRequest, useDebouncedValue } from '../utils';

import classes from './App.module.css';
import logo from './logo.svg';

export default function App() {
  const flickrService = useFlickrService();

  const [query, setQuery] = useState('Cygni');
  const debouncedQuery = useDebouncedValue(250, query);

  const [photos = [], { loading, error }] = useRequest(
    useCallback(signal => flickrService.searchPhotos(debouncedQuery, signal), [
      debouncedQuery,
      flickrService,
    ]),
  );

  return (
    <header className={classes.header}>
      <img src={logo} className={classes.logo} alt="logo" />
      <p>
        Edit <code className={classes.code}>src/App.tsx</code> and save to
        reload.
      </p>
      {loading ? <p>Loading</p> : <p>No images found</p>}
      {error && <p role="alert">Oh no!</p>}
      <label htmlFor="Search">Search</label>
      <input
        id="Search"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {photos.map(p => {
        console.log(p);
        return (
          <img
            key={p.id}
            id={p.id}
            alt={p.title}
            width={p.sizes[0].width}
            height={p.sizes[0].height}
            src={p.sizes[0].url}
          />
        );
      })}
    </header>
  );
}
