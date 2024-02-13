import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContext from '../../context/app.context';
import { Link } from 'react-router-dom';


function Login() {

    const setUser = useContext(AppContext).setUser

    const [email, setEmail] = useState('')
    const [password , setPassword] = useState('')

    const [error,setError] = useState(false)


    const submit = async (e) => {
        e.preventDefault();
      try {
          const formData = {email,password}
          const res = await axios.post( import.meta.env.VITE_API + '/login', formData);
          if(res.data != 'false'){
            setUser(res.data[0])
            setError(false)
          }else{
            setError(true)
          }
          clearForm();
          
      } catch (error) {
          console.error('Error submitting form:', error);
      }
  };

  const clearForm = () => {
      setEmail('');
      setPassword('');
  };

  useEffect(() => {
      clearForm(); 
  }, []);

  return (
    <div className='w-100 bg-dark vh-100 d-flex justify-content-center align-items-center position-relative'>    
    <div className={error ?"p-3 mb-2 bg-danger text-white position-fixed top-0":'d-none'}>You entered wrong email or password or you blocked</div>
    <Container className='w-25 bg-dark text-white'>
    <h1>Log in </h1>
    <Form onSubmit={(e)=> {submit(e) }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" required onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required onChange={(e)=> setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>
      <div className='d-flex justify-content-between'>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <div className='d-inline-block'>
                            If you have account <a className='btn btn-secondary mt-1' role="button" href='/'>sign in</a>
                        </div>
                    </div>
      <Link></Link>
    </Form>
  </Container>
  </div>
  );
}

export default Login;