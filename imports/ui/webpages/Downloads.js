import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { FilesCollection } from 'meteor/ostrio:files';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Meteor } from 'meteor/meteor';
import FormSubida from '../../uploadFiles/FormSubida.js';
import DescargarArchivos from '../../uploadFiles/DescargarArchivos.js';



export default class Downloads extends Component {
  render() {
    return (
        <div>
        <Panel>
            <h1>DOWNLOADS TEST</h1>
            
        </Panel>
        <FormSubida/>
        <DescargarArchivos/>
        </div>
    );
  }
}