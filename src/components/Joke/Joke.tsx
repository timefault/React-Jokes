/*
    Notes:  typying is loose in a few places
*/
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Placeholder from 'react-bootstrap/Placeholder';
import './Joke.css';


type Category = "Pun" | "Misc" | "Spooky" | "Christmas" | "Programming";

export function Joke({ jokeIdCache, setJokeIdCache }: { jokeIdCache: string[], setJokeIdCache: any }) {

    const [joke, setJoke] = useState({} as any);

    const [categories, setCategories] = useState({
        Pun: false, Misc: false, Spooky: false, Christmas: false, Programming: true
    })


    const init = () => {
        const firstFetch = async () => {
            let res = await fetchJoke();
            if (res?.data.error) return;
            setJokeIdCache([...jokeIdCache, res.data.id]);
            setJoke(res.data);
        };
        firstFetch();
    };

    useEffect(init, []);


    const API_ENDPOINT = "https://v2.jokeapi.dev/joke/";

    // const handleCategoriesChange = () => (e: React.ChangeEvent<HTMLInputElement>): void => {
    const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target as HTMLInputElement;

        const currState = { ...categories };
        currState[name as Category] = checked;
        setCategories(currState);
    };

    const getEndpoint = () => {
        let endpoint = API_ENDPOINT;
        Object.entries(categories).forEach(element => {
            if (element[1]) endpoint += element[0] + ',';
        });
        if (endpoint.endsWith(',')) endpoint = endpoint.slice(0, -1);
        endpoint += '?blacklistFlags=nsfw,racist,sexist,explicit';
        return endpoint;
    };



    const fetchJoke = async () => {
        let res: any = await axios.get(getEndpoint()).then(res => res).catch(err => console.log(err));
        return res;
    };

    const getFreshJoke = async () => {

        let attempt = 0;
        let res: any;

        console.log(jokeIdCache);

        while (attempt < 5) {
            res = await fetchJoke();
            if (res.data.error) return;
            if (!jokeIdCache.includes(res.data.id)) {
                break;
            }
            attempt++;
        }
        setJokeIdCache([...jokeIdCache, res.data.id]);
        setJoke(res.data);
        return;

    };
    const handleButtonClick = () => getFreshJoke();


    return (
        <Card className="h-100">
            <Card.Header>
                <JokeControls setCategories={handleCategoriesChange} categories={categories} />
            </Card.Header>
            <Card.Body className="d-flex flex-column justify-content-around">
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
            <Card.Footer className="d-flex justify-content-center">
                <Button className="button" onClick={handleButtonClick}>Next Joke</Button>
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

export function JokeControls({ setCategories, categories }: { setCategories: (e: React.ChangeEvent<HTMLInputElement>) => void, categories: { Pun: boolean, Misc: boolean, Spooky: boolean, Christmas: boolean, Programming: boolean } }) {
    return (
        <Form>
            <Form.Group className="">
                <Row>
                    <Col xs={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Pun"
                            name="Pun"
                            onChange={setCategories}
                            checked={categories.Pun}
                        ></Form.Check>
                    </Col>
                    <Col xs={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Misc"
                            name="Misc"
                            onChange={setCategories}
                            checked={categories.Misc}
                        ></Form.Check>
                    </Col>
                    <Col xs={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Spooky"
                            name="Spooky"
                            onChange={setCategories}
                            checked={categories.Spooky}
                        ></Form.Check>
                    </Col>
                    <Col xs={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Christmas"
                            name="Christmas"
                            onChange={setCategories}
                            checked={categories.Christmas}
                        ></Form.Check>
                    </Col>
                    <Col xs={6} xl={4}>
                        <Form.Check
                            type="checkbox"
                            label="Programming"
                            name="Programming"
                            onChange={setCategories}
                            checked={categories.Programming}
                        ></Form.Check>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    );
}


