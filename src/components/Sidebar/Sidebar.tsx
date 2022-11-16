import { ChangeEvent, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import './Sidebar.css';

export function Sidebar({ jokeCount, setJokeCount }: { jokeCount: number, setJokeCount: any }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="top" className="">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>How many Jokes?</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column align-items-center justify-content-center gap-4">
                    <label className="slider-label">{jokeCount}</label>
                    <input type="range" min="1" max="10" className="slider" onChange={(e: ChangeEvent<HTMLInputElement>) => setJokeCount(parseInt(e.target.value))} value={jokeCount} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}