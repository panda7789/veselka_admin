import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { getImages, updateImage } from '../models/images';

export class Galerie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            offset: 0,
            limit: 20
        };
    
        this.loadNext = this.loadNext.bind(this);
        this.loadImages = this.loadImages.bind(this);
        this.changeImageShowInGallery = this.changeImageShowInGallery.bind(this);
    }
    componentDidMount(){
        this.loadImages();
    }
    loadImages(){
        getImages(this.state.offset, this.state.limit, res => {
            this.setState({ images: this.state.images.concat(res) });
        });
    }

    loadNext(){
        this.setState({ offset: this.state.offset + this.state.limit });
        this.loadImages();
    }

    changeImageShowInGallery(filteringvalue) {
        this.setState(prevState => ({
            images: prevState.images.map(
                (el, index) => index === filteringvalue? { ...el, showInGallery: !el.showInGallery }: el
              )
        }), () => {
            updateImage(this.state.images[filteringvalue]);
        })
    }

    render() {
        return (
            <>
            <h1>Foto-galerie</h1>
            {
                this.state.images.map((imageURI, index) => 
                    (
                        <Card bg='Primary' style={{ display: 'inline-block', width: '18rem' }}>
                            <Card.Body>
                                <Card.ImgOverlay>
                                    <input 
                                        type="checkbox"
                                        id="custom-switch"
                                        checked={imageURI.showInGallery}
                                        onChange={(e) => this.changeImageShowInGallery(index)}
                                    />
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

