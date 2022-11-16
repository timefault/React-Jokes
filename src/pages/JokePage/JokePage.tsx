import { useState } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Joke } from "../../components/Joke/Joke"
import { Sidebar as Menu } from '../../components/Sidebar/Sidebar';

export function JokePage() {
    const [jokeCount, setJokeCount] = useState<number>(5);

    return (
        <>

            <Navbar className="py-2 bg-warning justify-content-between mb-2">
                <Menu setJokeCount={setJokeCount} jokeCount={jokeCount} />
                <h1>Jokes</h1>
            </Navbar>
            <Container>
                <Row xs={1} md={2} lg={3}>
                    {
                        [...Array(jokeCount).keys()].map((el, idx) =>
                        (
                            <Col key={idx}>
                                <Joke />
                            </Col>
                        )
                        )}
                </Row>
            </Container>
        </>
    );
}
