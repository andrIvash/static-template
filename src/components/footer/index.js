import React from 'react';
import cn from 'classnames';

export function Footer(props) {
  return (
    <footer className={cn('footer', props.className)}>
      © 2014–... <a href="http://">ddd</a>
    </footer>
  );
}