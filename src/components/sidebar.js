import React from "react";
import { Nav, Button } from "react-bootstrap";

export const Sidebar = props => {
    return (
        <>
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar" activeKey="/home">
                <Nav.Item>
                    <Nav.Link href="/aktuality">
                        <Button variant="primary" size="sm" block>                        
                            Aktuality
                        </Button>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/akce">
                        <Button variant="primary" size="sm" block>                        
                            Plánované akce
                        </Button>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/galerie">
                        <Button variant="primary" size="sm" block>                        
                            Galerie
                        </Button>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </>
        );
  };