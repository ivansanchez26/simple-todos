import React, { Component } from 'react';
import { Panel, Button, ListGroup, ListGroupItem, Row, Col, Label, Alert, Thumbnail, Image } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import SongFiles from '/lib/songFiles.collection.js';
import SongImages from '/lib/songImages.collection.js';


export class SongBody extends Component {

  constructor(props) {
    super(props);

  }

  renderDifs(){
      var rows = [];
      for(i=0;i<this.props.Song.difficulties.length;i++){
        if(this.props.Song.difficulties[i]>=15){
            rows.push( <Label bsStyle="danger" key={i}>{this.props.Song.difficulties[i]}</Label> );
        }else if(this.props.Song.difficulties[i]>=10){
            rows.push( <Label bsStyle="warning" key={i}>{this.props.Song.difficulties[i]}</Label> );
        }else if(this.props.Song.difficulties[i]>=5){
            rows.push( <Label bsStyle="primary" key={i}>{this.props.Song.difficulties[i]}</Label> );
        }else{
            rows.push( <Label bsStyle="info" key={i}>{this.props.Song.difficulties[i]}</Label> );
        }
        
        
      }
      return <div><p>Difficulties</p>{rows}</div>;
  }

  renderLink(){
    var link = this.props.File.link();
    if(this.props.currentUser != null){
        if(this.props.currentUser.emails[0].verified)
            return <a href={link} className="btn btn-primary btn-lg" download={this.props.File.name}>Download <i className="glyphicon glyphicon-download-alt"></i></a>;
        else
            return <Alert bsStyle="warning">You need a verified account before being able to download.</Alert>;
    }else{
        return <Alert bsStyle="warning">You need a verified account before being able to download.</Alert>;

    }

  }

  renderSong(){
    if(this.props.Image)
        var imageLink = this.props.Image.link();
    return(
        <div>
            <Row>
                <Col md={12} className="text-center">
                    <h1>{this.props.Song.name}</h1>
                    <br/>
                    {imageLink ?
                    <Image src={imageLink} alt="img" width="200"/> : <Image src="/images/image_not_found.png" alt="img" width="200"/>                    
                    }  
                    <p><br/>{this.props.Song.description}</p>
                    <br/>
                    {this.renderDifs()}
                    <br/>
                    {this.renderLink()}
                </Col>
            </Row>
        </div>
    );

  }

  render() {

    

    return (
        <div>
            {this.renderSong()}
        </div>
    );
  }
}

export default withTracker(props => {
    return {
        Song: props.Song,
        File : SongFiles.findOne({_id: props.Song.fileId}),
        Image : SongImages.findOne({_id: props.Song.imageId}),
        currentUser : props.currentUser,
    };
  })(SongBody);