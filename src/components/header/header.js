import React from 'react';
import cn from 'classnames';
//import styles from './header.css';



export function Header(props) {
  return (
    <header className={cn('header', props.className)}>
      header!!!
    <p className='text'>header text</p>
    </header>
  );
}