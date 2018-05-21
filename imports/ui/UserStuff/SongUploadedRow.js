import React, { Component } from 'react';
import { Panel, Row, Col, ListGroupItem, Badge, Label } from 'react-bootstrap';
import { Link } from "react-router-dom";


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
        return <span>{rows}</span>;
    }

    render() {
        
        var link = "/song/"+this.props.song.songId;

        return (
            <div>
                <ListGroupItem><Link to={link}>{this.props.song.songName}{this.renderDifficulties()}</Link></ListGroupItem>
            </div>
        );
    }
}