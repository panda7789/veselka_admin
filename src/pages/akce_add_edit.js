import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { createAkce, getOneAkce, updateAkce } from '../models/akce';


export class AkceAddEditPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nazev: '',
            misto: '',
            datum: '',
            typ: '',
            showAlertOk: false,
            showAlertFail: false,
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        if (this.props.match.params.id){
            getOneAkce(this.props.match.params.id, (res) => {
                var d = new Date(res.datum);
                var formattedDate = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
                this.setState({
                    nazev: res.nazev,
                    misto: res.misto,
                    datum: formattedDate,
                    typ: res.typ
                });
            });
        }
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }
    handleSubmit(event) {
        var obj = {
            nazev: this.state.nazev,
            misto: this.state.misto,
            datum: this.state.datum,
            typ: this.state.typ,
        }
        if (this.props.match.params.id){
            updateAkce(this.props.match.params.id, obj, (res) => {
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
            createAkce(obj, (res) => {
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

        event.preventDefault();
    }

    render() {
        return (
            <>
            <h1>{this.props.match && this.props.match.params.id ? "Úprava akce" : "Přidání akce"}</h1>
            <Alert variant="success" show={this.state.showAlertOk}>
                <Alert.Heading>Akce byla úspěšně přidána</Alert.Heading>
            </Alert>
            <Alert variant="danger" show={this.state.showAlertFail}>
                <Alert.Heading>Přidání akce skončilo chybou</Alert.Heading>
            </Alert>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="a">
                    <Form.Label>Název akce</Form.Label>
                    <Form.Control name="nazev" value={this.state.nazev} onChange={this.handleChange} type="text" />
                </Form.Group>
                <Form.Group controlId="b">
                    <Form.Label>Místo konání akce</Form.Label>
                    <Form.Control name="misto" value={this.state.misto} onChange={this.handleChange} type="text" />
                </Form.Group>
                <Form.Group controlId="c">
                    <Form.Label>Datum konání akce</Form.Label>
                    <Form.Control name="datum" value={this.state.datum} onChange={this.handleChange} type="date" />
                </Form.Group>
                <Form.Group controlId="d">
                    <Form.Label>Typ akce</Form.Label>
                    <Form.Control name="typ" value={this.state.typ} onChange={this.handleChange} type="text" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {this.props.match && this.props.match.params.id ? "Upravit" : "Přidat"}
                </Button>
            </Form>
            </>
        )
    }
}