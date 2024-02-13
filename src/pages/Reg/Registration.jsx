import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContext from '../../context/app.context';
import { Navigate, redirect } from 'react-router-dom';

function Registration() {
    const setUser = useContext(AppContext).setUser;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(false); 

    const submit = async (e) => {
        e.preventDefault();
        try {
            const formData = { name, email, password };
            const res = await axios.post(import.meta.env.VITE_API+'/signin', formData);
            
            if (res.data !="false") {
                console.log(res.data !="false");
                setUser(res.data);
                clearForm();

              <Navigate to ='/admin'></Navigate>
            } else {
                setError(true); 
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    const clearForm = () => {
        setEmail('');
        setPassword('');
        setName('');
    };

    useEffect(() => {
        clearForm();
    }, []);


    return (
        <div className='w-100 bg-dark vh-100 d-flex justify-content-center align-items-center'>
            <div className={error ? "p-3 mb-2 bg-danger text-white position-fixed top-0" : 'd-none'}>This user already exists</div>
            <Container className='w-25 bg-dark text-white'>
                <h1>Registration</h1>
                <Form onSubmit={(e) => submit(e)}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" required onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
                    </Form.Group>
                    <div className='d-flex justify-content-between'>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <div className='d-inline-block'>
                            If you have account <a className='btn btn-secondary mt-1' role="button" href='/login'>Login</a>
                        </div>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default Registration;
