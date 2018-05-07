import React, { Component } from 'react';
import NewPost from '/imports/ui/Forum/NewPost';
import PostList from '/imports/ui/Forum/PostList';

export default class Forum extends Component {
    constructor(props, context){
        super(props, context);
    }

  render() {
    return (
        <div>
          <NewPost/>
          <PostList/>  
        </div>    
        //FOR EACH DE LA BASE DE DATOS, COMPONENTE DE    
    );
  }
}