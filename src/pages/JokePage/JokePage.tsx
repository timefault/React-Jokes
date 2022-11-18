import { useState } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Joke } from "../../components/Joke/Joke"
import { Sidebar } from '../../components/Sidebar/Sidebar';

export function JokePage() {
    const [jokeCount, setJokeCount] = useState<number>(5);

    const [jokeIdCache, setJokeIdCache] = useState([] as string[]);

    return (
        <>

            <Navbar className="py-2 bg-warning  mb-2">
                <Sidebar jokeCount={jokeCount} setJokeCount={setJokeCount} />
                <h1 style={{ marginLeft: "auto", marginRight: "auto", transform: "translateX(-35px)" }}>Jokes</h1>
            </Navbar>
            <Container>
                <Row xs={1} md={2} lg={3} className="gy-2">
                    {
                        [...Array(jokeCount).keys()].map((el, idx) =>
                        (
                            <Col key={idx}>
                                <Joke jokeIdCache={jokeIdCache} setJokeIdCache={setJokeIdCache} />
                            </Col>

                        )
                        )}
                </Row>
            </Container>
        </>
    );
}
