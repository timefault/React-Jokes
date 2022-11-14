import { validateTileUUID } from '@fitbit/sdk/lib/ProjectConfiguration';
import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Placeholder from 'react-bootstrap/Placeholder';

type Category = "Pun" | "Misc" | "Spooky" | "Christmas" | "Programming";
export function Joke() {
    const API_ENDPOINT = "https://v2.jokeapi.dev/joke/Any";

    const [joke, setJoke] = useState({} as any);
    const [categories, setCategories] = useState({
        Pun: false, Misc: false, Spooky: false, Christmas: false, Programming: true
    })

    const handleCategoriesChange = (e: any) => {
        const { name, checked } = e.target;

        const currState = { ...categories };
        currState[name as Category] = checked;
        setCategories(currState);
        // console.log(categories);     This value is old
    };
    const init = () => {
        axios.get(API_ENDPOINT).then(res => { setJoke(res.data) }).catch(err => console.log(err));
    };

    useEffect(init, []);

    return (
        <Card>
            <Card.Header>
                <JokeControls setCategories={handleCategoriesChange} categories={categories} />
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

export function JokeControls({ setCategories, categories }: { setCategories: (e: SyntheticEvent) => void, categories: { Pun: boolean, Misc: boolean, Spooky: boolean, Christmas: boolean, Programming: boolean } }) {
    console.log(categories);
    return (
        <Form>
            <Form.Group className="">
                <Row>
                    <Col sm={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Pun"
                            name="Pun"
                            onChange={setCategories}
                        // checked={categoriesState.Pun}
                        ></Form.Check>
                    </Col>
                    <Col sm={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Misc"
                            name="Misc"
                            onChange={setCategories}
                        // checked={categoriesState.Misc}
                        ></Form.Check>
                    </Col>
                    <Col sm={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Spooky"
                            name="Spooky"
                            onChange={setCategories}
                        // checked={categoriesState.Spooky}
                        ></Form.Check>
                    </Col>
                    <Col sm={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Christmas"
                            name="Christmas"
                            onChange={setCategories}
                        // checked={categoriesState.Christmas}
                        ></Form.Check>
                    </Col>
                    <Col sm={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Programming"
                            name="Programming"
                            onChange={setCategories}
                        // checked={categories.Programming}
                        ></Form.Check>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    );
}


