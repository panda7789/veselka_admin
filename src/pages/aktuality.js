import React, { Component } from 'react';
import { Table, Button, Nav, Alert } from 'react-bootstrap';
import { getAktuality, deleteAktuality } from '../models/aktuality';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

export class AktualityListPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            aktuality: [],
            alertVariant: '',
            showAlert: false,
            alertText: ''
        };
    }

    handleDelete(id, event) {
        event.preventDefault();
        console.log(id);
        deleteAktuality(id, (res) => {
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
        this.setState({ aktuality: this.state.aktuality.filter(x => x.id!==id) });
    }

    componentDidMount() {
        getAktuality((res) => {
            this.setState({ aktuality: res });
        });
    }
    render() {
        return (
            <>
            <h1>Aktuality</h1>
            <Alert variant={this.state.alertVariant} show={this.state.showAlert}>
                <Alert.Heading>{this.state.alertText}</Alert.Heading>
            </Alert>
            <Nav.Link href="/aktuality_add">
                <Button variant="success" size="sm" block>                        
                    Přidat aktualitu
                </Button>
            </Nav.Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Název</th>
                    <th>Text</th>
                    <th></th>
                </tr>
                </thead>
                { this.state.aktuality && this.state.aktuality.map((akt) => (
                <tbody>
                    <tr>
                        <td>{akt.title}</td>
                        <td>
                            {akt.text}
                        </td>
                        <td style={{width: "9%" }}>
                            <Nav.Link href={"/aktuality_edit/" + akt.id}>
                                <Button variant="primary"><PencilSquare/></Button>
                            </Nav.Link>
                            <a href={"/aktuality_delete/" + akt.id} onClick={(e) => this.handleDelete(akt.id, e)}>
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