import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import './Sidebar.css';

export function Sidebar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>How many Jokes?</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="debug">
                    <input type="range" min="1" max="10" className="slider" />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}