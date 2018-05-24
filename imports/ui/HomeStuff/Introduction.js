import React, { Component } from 'react';
import {TweenMax, Power2, TimelineLite,SplitText} from "gsap";
import { Button } from 'react-bootstrap';

export default class Introduction extends React.Component {




    componentWillEnter (callback) {
        const el = this.container;
        TweenMax.fromTo(el, 0.5, {x: 0, opacity: 0}, {x: 0, opacity: 1, onComplete: callback});

    }
    
    componentWillLeave (callback) {
        const el = this.container;
        TweenMax.fromTo(el, 0, {x: 0, opacity: 1}, {x: 0, opacity: 0, onComplete: callback});
    }

    render () {
      return (
        <div className="box" ref={c => this.container = c}>
            <h1>Our Idea</h1>
            <p id="quote">K-Maniacs is a webiste for K-Shoot Mania players, it's idea is to allow players to share charts for the game in an easy and intuitive way.</p>
        </div>
      );
    }
  }