import React, { Component } from 'react';
import { Table, Button, Nav, Alert } from 'react-bootstrap';
import { getAkce, deleteAkce } from '../models/akce';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

export class AkceListPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            akce: [],
            alertVariant: '',
            showAlert: false,
            alertText: ''
        };
    }

    handleDelete(id, event) {
        event.preventDefault();
        console.log(id);
        deleteAkce(id, (res) => {
            var text = res ? 'Záznam byl smazán' : 'Něco se pokazilo';
            var variant = res ? 'success' : 'danger';
            this.setState({
                alertText: text,
                alertVariant: variant,
                showAlert: true
            });
            setTimeout(() => { 
                this.setState({
                    showAlert: false,
                }) }
            , 3000);
        });
        this.setState({ akce: this.state.akce.filter(x => x.id!==id) });
    }

    componentDidMount() {
        getAkce((res) => {
            this.setState({ akce: res });
        });
    }
    render() {
        return (
            <>
            <h1>Akce</h1>
            <Alert variant={this.state.alertVariant} show={this.state.showAlert}>
                <Alert.Heading>{this.state.alertText}</Alert.Heading>
            </Alert>
            <Nav.Link href="/akce_add">
                <Button variant="success" size="sm" block>                        
                    Přidat akci
                </Button>
            </Nav.Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Název</th>
                    <th>Místo</th>
                    <th>Datum</th>
                    <th>Typ</th>
                    <th></th>
                </tr>
                </thead>
                { this.state.akce && this.state.akce.map((akc) => (
                <tbody>
                    <tr>
                        <td>{akc.nazev}</td>
                        <td>{akc.misto}</td>
                        <td>{akc.datum}</td>
                        <td>{akc.typ}</td>
                        <td style={{width: "9%" }}>
                            <Nav.Link href={"/akce_edit/" + akc.id}>
                                <Button variant="primary"><PencilSquare/></Button>
                            </Nav.Link>
                            <a href={"/akce_delete/" + akc.id} onClick={(e) => this.handleDelete(akc.id, e)}>
                                <Button variant="danger"><Trash/></Button>
                            </a>
                        </td>
                    </tr>
                </tbody>
                ))}
                
            </Table>
            </>
        )
    }
}