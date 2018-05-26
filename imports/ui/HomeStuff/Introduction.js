import React, { Component } from 'react';
import {TweenMax, Power2, TimelineLite,SplitText} from "gsap";
import { Button, Row, Col } from 'react-bootstrap';

export default class Introduction extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            showBox : 1,
        }
    }

    toggleBox = (event) => {
        this.setState({
        showBox: event.target.name,
        });
        {
        
        var div = $(".box");
        div.animate({ opacity: '0.8'}, "normal");
        div.animate({ opacity: '1'}, "normal");

          }
    };

   

    renderText(){
        if(this.state.showBox==1){
            return (
                <div>
                    <h1>Our Idea</h1>
                    <h3>K-Maniacs is born as a website to reunite all K-Shoot Mania players from around the world in a unique place where they can share their charts with other members of the community in an easy and intuitive way.</h3>
                </div>
            );
        }
        if(this.state.showBox==2){
            return (
                <div>
                    <h1>About us</h1>
                    <h3>We are a couple of developers from Spain discovering new web technologies.</h3>
                </div>
            );
        }
        if(this.state.showBox==3){
            return (
                <div>
                    <h1>Where it started</h1>
                    <h3>It all started as a school project in which we wanted to make something worth more than just a school project no-use application. So we decided to do something for the community of a game we loved as a sign of appreciation for all the efforts the community has done throughout the years.</h3>
                </div>
            );
        }
    }

    render () {
      return (
        <div>
            <div className="box" >
                {this.renderText()}
                
            </div>
            <hr/>

            <div className="homeButtons">
                <Row>
                <Col xs={4}>
                    <Button  className="IntroButton" name="1" onClick={this.toggleBox}  bsStyle="primary" bsSize="large">Our idea</Button>
                </Col>
                <Col xs={4}>
                    <Button  className="IntroButton" name="2" onClick={this.toggleBox} bsStyle="primary" bsSize="large">About us</Button>
                </Col>
                <Col xs={4}>
                    <Button  className="IntroButton" name="3" onClick={this.toggleBox} bsStyle="primary" bsSize="large">Where it started</Button>
                </Col>
                </Row>
            </div>
            <br/>
        </div>
      );
    }
  }