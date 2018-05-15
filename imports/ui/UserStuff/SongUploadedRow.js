import React, { Component } from 'react';
import { Panel, Row, Col, ListGroupItem, Badge, Label } from 'react-bootstrap';


export class SongUploadedRow extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount(){
    }

    renderDifficulties(){
        var rows = [];

        for(i=this.props.song.songDifficulties.length-1;i>-1;i--){
            rows.push( <Badge pullRight key={i}>{this.props.song.songDifficulties[i]}</Badge>);
        }
        return <a>{rows}</a>;
    }

    render() {
        
        return (
            <div>
                <ListGroupItem>{this.props.song.songName}{this.renderDifficulties()}</ListGroupItem>
            </div>
        );
    }
}