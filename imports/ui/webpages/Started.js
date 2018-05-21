import React, { Component } from 'react';
import { Panel, Image } from 'react-bootstrap';

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
            <h1>Getting started in K-Shoot Mania</h1><br /><br />

            <Panel id="collapsible-panel-example-2">
              <Panel.Heading>
                <Panel.Title toggle>
                  How to download the game
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  <p>
                    You can download the game in the official <a href="http://www.kshootmania.com/download.html" target="_blank">K-Shoot Mania page.</a><br/>
                    In this webpage you'll have to click this button:<br/>
                    <Image src="/images/download.png" responsive rounded/><br/>
                    
                  </p>
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
            <Panel id="collapsible-panel-example-2">
              <Panel.Heading>
                <Panel.Title toggle>
                  How to download songs
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt sapiente
                  ea proident.
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
            <Panel id="collapsible-panel-example-2">
              <Panel.Heading>
                <Panel.Title toggle>
                  How to install songs in the game
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt sapiente
                  ea proident.
                </Panel.Body>
              </Panel.Collapse>
            </Panel>

            <p>
              

            </p>

            {
              /*
                0. Como descargar el juego
                1. Como descargar canciones
                2. Como meter las canciones en el juego
              */
            }
        </Panel>
    );
  }
}