import React, { Component } from 'react';
import { Panel, Well, Button, Modal, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { News } from '../../collections/news';
import { Meteor } from 'meteor/meteor';




export class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
      show: false,
      title : "",
      content : "",
      showLoadMoreButton : true,
    };

  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  insertNew(event){
    event.preventDefault();
    if(this.state.title!="" && this.state.content != ""){
      Meteor.call('news.insert',this.state.title,this.state.content);
      this.setState({ show: false });
    }else{
      Bert.alert('Make sure to fill all the fields','danger', 'growl-top-right'); 
    }

  }

  handleChange(event){
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  renderNews(){

    rows = [];
    var length = this.props.news.length;
    if(this.state.limit<this.props.news.length){
      var length = this.state.limit;
    }

    for(i=0;i<length;i++){
      rows.push(
        <Panel key={i}>
          <Panel.Heading>
            <h3>{this.props.news[i].title}</h3>
          </Panel.Heading>
          <Panel.Body>
            <p>{this.props.news[i].content}</p>
          </Panel.Body>
        </Panel>
      );
    }

    return(
      <div>{rows}</div>
    );
  }

  renderInsertNewButton(){
    if(Roles.userIsInRole( this.props.currentUserId, 'Admins' )){
      return(
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow.bind(this)}>
          Insert new
        </Button>
      );
    }
  }

  loadMore(){
    this.setState({limit: this.state.limit+5});
    if(this.state.limit+5>=this.props.news.length)
      this.setState({showLoadMoreButton : false});
  }

  renderLoadMoreButton(){
    
    if(this.state.showLoadMoreButton){
      return(
        <Button onClick={this.loadMore.bind(this)}>Load more</Button>
      );
    }
  }

  render() {
    return (
      <div>
        <Panel>
          <Panel.Body>
            <h1>Home</h1>
          </Panel.Body>
        </Panel>
        <Panel>
          <Panel.Body>
            <Well>Quienes somos y de donde surje</Well>
            <h2>News</h2>
            <div className="static-modal">
              <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                <Modal.Header>
                  <Modal.Title>Insert New</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <form>
                  <FormGroup controlId="formTitle">
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.title}
                      name="title"
                      placeholder="Enter Title"
                      onChange={this.handleChange.bind(this)}
                    />
                  </FormGroup>
                  <FormGroup controlId="formContent">
                    <ControlLabel>Content</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      rows="7"
                      type="text"
                      value={this.state.content}
                      name="content"
                      placeholder="Content"
                      onChange={this.handleChange.bind(this)}
                    />
                  </FormGroup>
                </form>
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={this.handleClose.bind(this)}>Close</Button>
                  <Button bsStyle="primary" onClick={this.insertNew.bind(this)}>Add new</Button>
                </Modal.Footer>
              </Modal>
            </div>

            {this.renderInsertNewButton()}
            {this.renderNews()}
            {this.renderLoadMoreButton()}
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default withTracker(props => {
  Meteor.subscribe('news');
  return {
    currentUserId : Meteor.userId(),
    news : News.find({},{sort: {createdAt:-1}}).fetch(),

  };
})(Home);