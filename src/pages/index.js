import React from 'react';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer';
// import '../styles/app.css';

export default function() {
  return (
    <div className="wrapper">
      <div className="page__header">
        <Header />
      </div>

      <main className="page__content">
        <h2 className="heading heading--1">
         Home page.
        </h2> 

        <ul className="list">
          <li className="list__item">
            <a className="link" href="/blog/about">
              Home
            </a>
          </li>
        </ul>
      </main>

      <Footer className="page__footer" />
    </div>  
  );
}