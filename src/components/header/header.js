import React from 'react';
import cn from 'classnames';
import styles from './header.css';



export function Header(props) {
  return (
    <header className={cn(styles.header, props.className)}>
      header!!!
    <p className={styles.header__text} onClick = {props.handleSelect} >header text</p>
    </header>
  );
}