import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Col, Nav, NavDropdown } from 'react-bootstrap';


export default function Menu() {
    return (
        <Col style={{ padding_tom: "5px" }}>
            <Nav variant="tabs"
            >
                <LinkContainer to="/pages/index">
                    <Nav.Item as={Nav.Link}>
                        Domů
                    </Nav.Item>
                </LinkContainer>
                <LinkContainer to="/pages/index">
                    <Nav.Item as={Nav.Link}>
                        Aktuality
                    </Nav.Item>
                </LinkContainer>
                <LinkContainer to="/pages/index">
                    <Nav.Item as={Nav.Link}>
                        Plánované akce
                    </Nav.Item>
                </LinkContainer>
                <LinkContainer to="/pages/obsazeni">
                    <Nav.Item as={Nav.Link}>
                        Obsazení
                    </Nav.Item>
                </LinkContainer>
                <NavDropdown title="Galerie">
                        <NavDropdown.Item tag={LinkContainer} to={'/pages/index'}>Fotogalerie</NavDropdown.Item>
                        <NavDropdown.Item tag={LinkContainer} to={'/pages/index'}>Videa</NavDropdown.Item>
                </NavDropdown>
                <LinkContainer to="/pages/index">
                    <Nav.Item as={Nav.Link}>
                        Kontakty
                    </Nav.Item>
                </LinkContainer>
            </Nav>
        </Col >
    );
}