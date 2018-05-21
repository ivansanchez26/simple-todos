import React, { Component } from 'react';
import { Panel, Form, FormGroup, Col, HelpBlock, Button, FormControl, ProgressBar, Row, Badge, ListGroup, ListGroupItem } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { SongUploadedRow } from './SongUploadedRow';

export class OwnProfile extends Component {

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
        if(this.props.userProfile){
            this.setState({
                realName : this.props.userProfile.realName,
                description : this.props.userProfile.description,
                danLvl : this.props.userProfile.danLvl,
                songs : this.props.userProfile.uploadedSongs,
                firstTime : false,
            });
        }
    }

    componentDidUpdate(){
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

    handleInputChange(event) {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
         Meteor.call('userProfiles.updateNameDescription',this.state.realName,this.state.description,( error ) =>{
            if(!error){
                Bert.alert('Fields updated successfully','success','growl-bottom-right');
            }else{
                Bert.alert( error.reason, 'danger' );
            }
        });
        
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
                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>

                    

                    <FormGroup controlId="formHorizontalRealName">
                    <Col  sm={2}>
                        Real name 
                    </Col>
                    <Col sm={4}>
                        <FormControl type="text" name="realName" value={this.state.realName} onChange={this.handleInputChange.bind(this)} />
                    </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalDescription">
                    <Col  sm={2}>
                        Define yourself!  
                    </Col>
                    <Col sm={8}>
                        <FormControl componentClass="textarea" type="text" rows="5" name="description" value={this.state.description} onChange={this.handleInputChange.bind(this)} />
                    </Col>
                    </FormGroup>
                    <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit">Save Changes</Button>
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
