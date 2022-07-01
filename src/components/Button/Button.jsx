import React from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';

function Button(props) {
  const { children, type, className } = props;
  const classes = cn({
    [className]: className,
    [styles['button']]: true,
    [styles['button__general']]: type === 'general',
    [styles['button__blocked']]: type === 'blocked',
    [styles['button__submit']]: type === 'submit',
  });
  return (
    <button {...props} className={classes}>
      { children }
    </button>
  );
}

export default Button;