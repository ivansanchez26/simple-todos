import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';


export class NotFoundProfile extends Component {

    constructor(props) {
        super(props);
        console.log("asdf");

    }

    componentDidMount(){
        console.log("hola");
    }

    render() {
        
        return (
            <div>
                <h3>User not found</h3>
            </div>
        );
    }
}
