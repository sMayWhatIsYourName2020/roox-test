import React from 'react';
import styles from './Loader.module.css';

function Loader() {
  return (
    <progress className={styles['pure-material-progress-circular']} />
  );
}

export default Loader;