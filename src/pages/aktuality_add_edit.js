import React, { Component } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { createAktuality, getOneAktuality, updateAktuality } from '../models/aktuality';
import { Trash } from 'react-bootstrap-icons';

export class AktualityAddEditPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            text: '',
            images: [],
            imagesPreviews: [],
            showAlertOk: false,
            showAlertFail: false,
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.removeImage = this.removeImage.bind(this);
    }
    componentDidMount() {
        if (this.props.match.params.id){
            getOneAktuality(this.props.match.params.id, (res) => {
                this.setState({
                    title: res.title,
                    text: res.text,
                    images: res.images,
                    imagesPreviews: res.images.map(x => x.urlThumbnail)
                });
            });
        }
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }
    fileSelectedHandler = (e) => {
        this.generateImagePreviews(e.target.files);
        this.setState({ images: [...this.state.images, ...e.target.files] });
    }
    generateImagePreviews(input) {
        const files = Array.from(input);
        Promise.all(files.map(file => {
            return (new Promise((resolve,reject) => {
                const reader = new FileReader();
                reader.addEventListener('load', (ev) => {
                    resolve(ev.target.result);
                });
                reader.addEventListener('error', reject);
                reader.readAsDataURL(file);
            }));
        }))
        .then(images => {
            this.setState({ imagesPreviews : images })

        }, error => {        
            console.error(error);
        });
    }
    removeImage(filteringvalue) {
        var index = this.state.imagesPreviews.findIndex(x => x === filteringvalue);
        this.setState({
            images: this.state.images.filter((_, i) => i !== index),
            imagesPreviews: this.state.imagesPreviews.filter((_, i) => i !== index)
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        var obj = {
            title: this.state.title,
            text: this.state.text,
            images: this.state.images
        }
        var images = this.state.images;

        if (this.props.match.params.id){
            updateAktuality(this.props.match.params.id, obj, images, (res) => {
                this.setState({
                    showAlertOk: res,
                    showAlertFail: !res,
                });
                setTimeout(() => { 
                    this.setState({
                        showAlertOk: false,
                        showAlertFail: false}) }
                , 3000);
            });
        }
        else{
            createAktuality(obj, images, (res) => {
                this.setState({
                    showAlertOk: res,
                    showAlertFail: !res,
                });
                setTimeout(() => { 
                    this.setState({
                        showAlertOk: false,
                        showAlertFail: false}) }
                , 3000);
            });
        }
    }

    render() {
        return (
            <>
            <h1>{this.props.match && this.props.match.params.id ? "Úprava aktuality" : "Přidání aktuality"}</h1>
            <Alert variant="success" show={this.state.showAlertOk}>
                <Alert.Heading>Aktualita byla úspěšně přidána</Alert.Heading>
            </Alert>
            <Alert variant="danger" show={this.state.showAlertFail}>
                <Alert.Heading>Přidání aktuality skončilo chybou</Alert.Heading>
            </Alert>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="a">
                    <Form.Label>Nadpis</Form.Label>
                    <Form.Control name="title" value={this.state.title} onChange={this.handleChange} type="text" />
                </Form.Group>
                <Form.Group controlId="b">
                    <Form.Label>Text</Form.Label>
                    <Form.Control as="textarea" name="text" rows="5" value={this.state.text} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="c">
                    <Form.Label>Obrázky</Form.Label>
                    <Form.Control name="images" type="file" multiple onChange={this.fileSelectedHandler} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {this.props.match && this.props.match.params.id ? "Upravit" : "Přidat"}
                </Button>
            </Form>
            {
                this.state.imagesPreviews.map(imageURI => 
                    (
                        <Card bg='Primary' style={{ display: 'inline-block', width: '18rem' }}>
                            <Card.Body>
                                <Card.ImgOverlay>
                                    <Card.Link onClick={(e) => this.removeImage(imageURI)} style={{float: 'right', fontSize: '25px'}}><Trash /></Card.Link>
                                </Card.ImgOverlay>
                                <Card.Img variant="bottom" src={imageURI} />
                            </Card.Body>
                        </Card>
                        )
                    )
            }
            
                             
            </>
        )
    }
}

