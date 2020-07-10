import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { getImages } from '../models/images';

export class Galerie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            offset: 0,
            limit: 20
        };
    
        this.removeImage = this.removeImage.bind(this);
        this.loadNext = this.loadNext.bind(this);
        this.loadImages = this.loadImages.bind(this);
    }
    componentDidMount(){
        this.loadImages();
    }
    loadImages(){
        getImages(this.state.offset, this.state.limit, res => {
            this.setState({ images: this.state.images.concat(res) });
        });
    }

    removeImage(filteringvalue) {
        var index = this.state.images.findIndex(x => x === filteringvalue);
        this.setState({
            images: this.state.images.filter((_, i) => i !== index),
        });
    }

    loadNext(){
        this.setState({ offset: this.state.offset + this.state.limit });
        this.loadImages();
    }

    render() {
        return (
            <>
            <h1>Foto-galerie</h1>
            {
                this.state.images.map(imageURI => 
                    (
                        <Card bg='Primary' style={{ display: 'inline-block', width: '18rem' }}>
                            <Card.Body>
                                <Card.ImgOverlay>
                                    <Card.Link onClick={(e) => this.removeImage(imageURI._id)} style={{float: 'right', fontSize: '25px'}}><Trash /></Card.Link>
                                </Card.ImgOverlay>
                                <Card.Img variant="bottom" src={imageURI.urlThumbnail} />
                            </Card.Body>
                        </Card>
                        )
                    )
            }
            <Button variant="success" size="sm" onClick={this.loadNext} block>                        
                Načíst další
            </Button>             
            </>
        )
    }
}

