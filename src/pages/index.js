import React, { Component } from 'react';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer';
// import '../styles/app.css';

class App extends Component {

  onSelect = () => {
    console.log('click');
  }

  render() {
    return (
      <div className="wrapper">
        <div className="page__header">
          <Header handleSelect = {this.onSelect} />
        </div>

        <main className="page__content">
          <h2 className="heading heading--1">
          Home page.
          </h2> 

          <ul className="list">
            <li className="list__item">
              <a className="link" href="/blog">
                Blog
              </a>
            </li>
          </ul>
        </main>

        <Footer className="page__footer" />
      </div>  
    );
  };
}

export default App;