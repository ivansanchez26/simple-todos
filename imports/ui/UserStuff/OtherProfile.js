import React, { Component } from 'react';
import { Panel, Row, Col, ProgressBar, Badge } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';


export class OtherProfile extends Component {


  constructor(props) {
    super(props);
    this.state = {
      realName: "",
      description:"",
      danLvl:1,
      firstTime:true,
    };

  }

    componentDidMount(){
        if(this.state.firstTime){
            this.setState({
                realName : this.props.userProfile.realName,
                description : this.props.userProfile.description,
                danLvl : this.props.userProfile.danLvl,
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

  render() {
      return (
          <div>
                <Row>
                  <Col  sm={2}>
                      Real name 
                  </Col>
                  <Col sm={4}>
                    <Panel>
                      <Panel.Body>{this.state.realName}</Panel.Body>
                    </Panel>
                  </Col>
                </Row>
                <Row>

                  <Col  sm={2}>
                      Description  
                  </Col>
                  <Col sm={8}>
                  <Panel>
                    <Panel.Body>{this.state.description}</Panel.Body>
                  </Panel>
                  </Col>
                </Row>
                  
              <Row>
                  <Col  sm={2}>
                      Dan progress &emsp; <Badge>{this.state.danLvl+"/20"}</Badge>
                  </Col>
                  <Col  sm={10}>
                      {this.renderDanLvlBar()}
                  </Col>
              </Row>
              <h3>Uploaded Songs</h3>
              
          </div>
      );
  }
}
