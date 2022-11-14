import { Col, Container, Row } from "react-bootstrap";
import { Joke } from "../components/Joke";

export function JokePage() {
    return (
        <>
            <h1 className="text-center py-2 bg-warning">Jokes</h1>
            <Container>
                <Row xs={1} md={2} lg={3}>
                    <Col>
                        <Joke />
                    </Col>
                    {/* <Col>
                        <Joke />
                    </Col>
                    <Col>
                        <Joke />
                    </Col>
                    <Col>
                        <Joke />
                    </Col> */}
                </Row>
            </Container>
        </>
    );
}
