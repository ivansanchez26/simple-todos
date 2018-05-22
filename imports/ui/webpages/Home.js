import React, { Component } from 'react';
import { Panel, Well, Button, Modal, ControlLabel, FormControl, FormGroup, Row, Col } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { News } from '../../collections/news';
import { Meteor } from 'meteor/meteor';
import TransitionGroup from 'react-addons-transition-group';
import Introduction from '../HomeStuff/Introduction';
import Introduction2 from '../HomeStuff/Introduction2';
import Introduction3 from '../HomeStuff/Introduction3';


export class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      limit: 6,
      show: false,
      title : "",
      content : "",
      showLoadMoreButton : true,
      showBox : 1,
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

  deleteNew(event){
    Meteor.call('news.remove',event.target.id);
  }

  renderDeleteButton(newId){
    if(Roles.userIsInRole(this.props.currentUserId,'Admins')){
      return <Button bsStyle="danger" id={newId} onClick={this.deleteNew.bind(this)}>Delete</Button>;
    }
  }

  renderNews(){

    rows = [];
    var length = this.props.news.length;
    if(this.state.limit<this.props.news.length){
      var length = this.state.limit;
    }

    for(i=0;i<length;i++){
      //Shows the panels in a grid of two columns per row
      if(i%2==0){
        if(this.props.news[i+1]!=undefined){
          rows.push(
            <Row key={i}>
              <Col md={6}>
                <Panel >
                  <Panel.Heading>
                    <h3>{this.props.news[i].title}</h3><p><small>Uploaded by: <strong>{this.props.news[i].uploaderUsername}</strong> </small></p><p><small>{this.props.news[i].createdAt.toLocaleDateString()}</small></p>
                    {this.renderDeleteButton(this.props.news[i]._id)}
                  </Panel.Heading>
                  <Panel.Body>
                    <p>{this.props.news[i].content}</p>
                  </Panel.Body>
                </Panel>
              </Col>
              <Col md={6}>
                <Panel >
                  <Panel.Heading>
                    <h3>{this.props.news[i+1].title}</h3><p><small>Uploaded by: <strong>{this.props.news[i+1].uploaderUsername}</strong> </small></p><p><small>{this.props.news[i+1].createdAt.toLocaleDateString()}</small></p>
                    {this.renderDeleteButton(this.props.news[i+1]._id)}
                  </Panel.Heading>
                  <Panel.Body>
                    <p>{this.props.news[i+1].content}</p>
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
          );
        }else{
          rows.push(
            <Row key={i}>
                <Col md={6}>
                  <Panel >
                    <Panel.Heading>
                      <h3>{this.props.news[i].title}</h3><p><small>Uploaded by: <strong>{this.props.news[i].uploaderUsername}</strong> </small></p><p><small>{this.props.news[i].createdAt.toLocaleDateString()}</small></p>
                      {this.renderDeleteButton(this.props.news[i]._id)}
                    </Panel.Heading>
                    <Panel.Body>
                      <p>{this.props.news[i].content}</p>
                    </Panel.Body>
                  </Panel>
                </Col>
              </Row>
          );
        }
      }
      
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
    this.setState({limit: this.state.limit+6});
    if(this.state.limit+6>=this.props.news.length)
      this.setState({showLoadMoreButton : false});
  }

  renderLoadMoreButton(){
    
    if(this.state.showLoadMoreButton){
      return(
        <Button onClick={this.loadMore.bind(this)}>Load more</Button>
      );
    }
  }

  toggleBox = () => {
    this.setState({
      showBox: this.state.showBox+1,
    });
  };

  renderIntroduction(){
    if(this.state.showBox==1){
      return <Introduction/>;
    }else if(this.state.showBox==2){
      return <Introduction2/>;
    }else if(this.state.showBox==3){
      return <Introduction3/>;
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
            <div className="page">
              <TransitionGroup>
                {this.renderIntroduction()}
              </TransitionGroup>

              <button
                className="toggle-btn"
                onClick={this.toggleBox}
              >
                toggle
              </button>
            </div>
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