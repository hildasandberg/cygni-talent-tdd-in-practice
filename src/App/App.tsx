import React from 'react';
import logo from './logo.svg';
import classes from './App.module.css';

export default function App() {
  return (
    <header className={classes.header}>
      <img src={logo} className={classes.logo} alt="logo" />
      <p>
        Edit <code className={classes.code}>src/App.tsx</code> and save to
        reload.
      </p>
      <a
        className={classes.link}
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
}
