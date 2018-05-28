import React, { Component } from 'react';
import { Panel, Image, Row, Col } from 'react-bootstrap';

export default class Started extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: true
    };
  }

  render() {
    return (
        <Panel>
            <Row>
              <Col xs={10} xsOffset={1}>
                <h1>Getting started in K-Shoot Mania</h1><br /><br />
              </Col>
            </Row>
            <Row>
              <Col xs={10} xsOffset={1}>
              <Panel id="collapsible-panel-example-2" bsStyle="info">
                <Panel.Heading>
                  <Panel.Title toggle>
                    How to download the game
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                    <p>
                      You can download the game in the official <a href="http://www.kshootmania.com/download.html" target="_blank">K-Shoot Mania page.</a><br/>
                      In this webpage you'll have to click this button:<br/><br/>
                      <Image src="/images/download.png" responsive rounded/><br/>

                      To play the game you'll have to unzip it from the file you just have downloaded and that's it, now you can play K-Shoot Mania.                    
                    </p>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
              </Col>
            </Row>
            <Row>
              <Col xs={10} xsOffset={1}>
            <Panel id="collapsible-panel-example-2" bsStyle="info">
              <Panel.Heading>
                <Panel.Title toggle>
                  How to download songs
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  To download songs from this webpage you'll first have to create an account in the register form.
                  You may access it by click login at the right side in the navegation bar at the top of the webpage.
                  <br/><br/>
                  Once you have registered you'll need to verify your account by clicking the link sent to the email you registered with.
                  Now you can download songs in the download section of our webpage by clicking the download button below the song.
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
            </Col>
            </Row>
            <Row>
              <Col xs={10} xsOffset={1}>
            <Panel id="collapsible-panel-example-2" bsStyle="info" >
              <Panel.Heading>
                <Panel.Title toggle>
                  How to install songs in the game
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  Installing a song in K-Shoot Mania is so simple, you just need to unzip the file you downloaded in the download section
                  to the songs folder in the K-Shoot Mania folder.
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
            </Col>
            </Row>
            <br/>
        </Panel>
    );
  }
}