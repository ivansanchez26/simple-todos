import React, { Component } from 'react';
import { Panel, Row, Col, ProgressBar, Badge, ListGroup, FormControl, Form, FormGroup } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { SongUploadedRow } from './SongUploadedRow';


export class OtherProfile extends Component {


  constructor(props) {
    super(props);
    this.state = {
      realName: "",
      description:"",
      danLvl:1,
      songs:[],
      firstTime:true,
    };

  }

    componentDidMount(){
        if(this.state.firstTime){
            this.setState({
                realName : this.props.userProfile.realName,
                description : this.props.userProfile.description,
                danLvl : this.props.userProfile.danLvl,
                songs : this.props.userProfile.uploadedSongs,
                firstTime : false,
            });
        }
    }


  renderDanLvlBar(){

      if(this.state.danLvl>15){
          var toLoad=(this.state.danLvl-15)*5;
          return <ProgressBar>
                      <ProgressBar bsStyle="info" now={25} key={1} />
                      <ProgressBar bsStyle="success" now={25} key={2} />
                      <ProgressBar bsStyle="warning" now={25} key={3} />
                      <ProgressBar bsStyle="danger" now={toLoad} key={4} />
                  </ProgressBar>;
      }else if(this.state.danLvl>10){
          var toLoad=(this.state.danLvl-10)*5;
          return <ProgressBar>
                      <ProgressBar bsStyle="info" now={25} key={1} />
                      <ProgressBar bsStyle="success" now={25} key={2} />
                      <ProgressBar bsStyle="warning" now={toLoad} key={3} />
                  </ProgressBar>;
      }else if(this.state.danLvl>5){
          var toLoad=(this.state.danLvl-5)*5;
          return <ProgressBar>
                      <ProgressBar bsStyle="info" now={25} key={1} />
                      <ProgressBar bsStyle="success" now={toLoad} key={2} />
                  </ProgressBar>;
      }else{
          var toLoad=(this.state.danLvl)*5;
          return <ProgressBar>
                      <ProgressBar bsStyle="info" now={toLoad} key={1} />
                  </ProgressBar>;
      }
      
  }


    renderSongsUploaded(){
        var rows = [];

        for(i=0;i<this.state.songs.length;i++){
            rows.push(<SongUploadedRow key={i} song={this.state.songs[i]}/>);
        }
        return <ListGroup>{rows}</ListGroup>;
    }

  render() {
      return (
          <div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalRealName">
                    <Col  sm={2}>
                        Real name 
                    </Col>
                    <Col sm={4}>
                        <FormControl type="text" name="realName" value={this.state.realName} disabled/>
                    </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalDescription">
                    <Col  sm={2}>
                        Define yourself!  
                    </Col>
                    <Col sm={8}>
                        <FormControl componentClass="textarea" type="text" rows="5" name="description" value={this.state.description} disabled />
                    </Col>
                    </FormGroup>
                </Form>
              <Row>
                  <Col  sm={2}>
                      Skill progress &emsp; <Badge>{this.state.danLvl+"/20"}</Badge>
                  </Col>
                  <Col  sm={10}>
                      {this.renderDanLvlBar()}
                  </Col>
              </Row>
              <h3>Uploaded Songs</h3>
              {this.renderSongsUploaded()}
              
          </div>
      );
  }
}
