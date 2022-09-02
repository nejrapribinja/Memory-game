import React, { useState } from "react";
import { Container, Form, Card, Button, Col } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase-config';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const register = async (e) => {
        e.preventDefault()
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log(user);
            navigate('/');
        } catch (err) {
            console.log(err);
            setError(err.code)
        }
    }

    return (
        <Container fluid className='d-flex align-items-center justify-content-center c'>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <div className="error">{error}</div>}
                        <Form onSubmit={register}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            <Button className="w-100 mt-3" type="submit">Sign Up</Button>
                        </Form>
                    </Card.Body>
                    <p className="w-100 text-center">
                        Already have an account? <Link to="/">Log In</Link>
                    </p>
                </Card>
            </Col>
        </Container>
    )
}

export default SignUp;