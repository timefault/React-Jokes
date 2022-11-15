import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Joke } from "../../components/Joke/Joke"
import { Sidebar as Menu } from '../../components/Sidebar/Sidebar';

export function JokePage() {
    return (
        <>

            <Navbar className="py-2 bg-warning justify-content-between mb-2">
                <Menu />
                <h1>Jokes</h1>
            </Navbar>
            <Container>
                <Row xs={1} md={2} lg={3}>
                    <Col>
                        <Joke />
                    </Col>
                    <Col>
                        <Joke />
                    </Col>
                    <Col>
                        <Joke />
                    </Col>
                    <Col>
                        <Joke />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
