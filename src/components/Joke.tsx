import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Placeholder from 'react-bootstrap/Placeholder';

export function Joke() {


    const API_ENDPOINT = "https://v2.jokeapi.dev/joke/Any";

    const [joke, setJoke] = useState({} as any);

    const init = () => {
        axios.get(API_ENDPOINT).then(res => { setJoke(res.data); console.log(res) }).catch(err => console.log(err));
    };

    useEffect(init, []);

    return (
        <Card>
            <Card.Header>
                <JokeControls />
            </Card.Header>
            <Card.Body>
                {
                    Object.keys(joke).length === 0 ?
                        <>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder md={6} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder md={6} />
                                <Placeholder md={6} />
                            </Placeholder>
                        </>
                        :
                        <>
                            {joke.type === 'single' ? <SingleType content={joke.joke} /> : <TwoPartType setup={joke.setup} delivery={joke.delivery} />}
                        </>
                }
            </Card.Body>
            <Card.Footer>
                <Button>Next Joke</Button>
            </Card.Footer>
        </Card >
    );
}
type SinglePartTypeProps = { content: string };
export function SingleType({ content }: SinglePartTypeProps) {
    return (
        <Card.Text className="p-5" style={{ backgroundColor: "#DDD", borderRadius: "100%", fontStyle: "italic" }}>{content}</Card.Text>
    );
}
type TwoPartTypeProps = { setup: string, delivery: string };
export function TwoPartType({ setup, delivery }: TwoPartTypeProps) {
    return (
        <>
            <Card.Text className="p-5" style={{ backgroundColor: "#DDD", borderRadius: "100%" }}>{setup}</Card.Text>
            <Card.Text className="p-5 font-italic" style={{ backgroundColor: "#DDD", borderRadius: "100%", fontStyle: "italic" }}>{delivery}</Card.Text>
        </>
    );
}

export function JokeControls() {
    return (
        <Form>
            <Form.Group className="">
                <Row>
                    <Col sm={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Programming"
                        ></Form.Check>
                    </Col>
                    <Col sm={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Misc"
                        ></Form.Check>
                    </Col>
                    <Col sm={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Pun"
                        ></Form.Check>
                    </Col>
                    <Col sm={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Spooky"
                        ></Form.Check>
                    </Col>
                    <Col sm={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Christmas"
                        ></Form.Check>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    );
}


