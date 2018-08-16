import React from 'react';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer';

export default function() {
  return (
    <div>
      <div className="page__header">
        <Header />
      </div>

      <main className="page__content">
        <h2 className="heading heading--1">
         Blog page
        </h2> 

        <ul className="list">
          <li className="list__item">
            <a className="link" href="/">
              Home
            </a>
          </li>
        </ul>
      </main>

      <Footer className="page__footer" />
    </div>  
  );
}