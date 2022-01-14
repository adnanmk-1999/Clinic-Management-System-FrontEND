import {useState} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function LoginForm(){
    localStorage.clear();
    
    //A simple reload of the page once.
    window.onload = function() {
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

    return (
        <>
      <center>  <h1>Enter Login Details</h1></center>
        <MyForm/>
        </>
    );
}

function MyForm(props){
    const [inputs, setInputs] = useState({});

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name] : value}))
    };

    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs);

        axios.post(`users/login`, inputs)
            .then(response => { 
                localStorage.setItem('mytoken', response.data.accessToken)
                localStorage.setItem('myrole', response.data.roleId)
                localStorage.setItem('myemail', response.data.user.userName)
                window.location = '/'        
            })
            .catch(error =>{
                localStorage.clear();
                if(error.response){
                    alert(error.response.data)  //=> response payload
                }
            })
    };

    function goToHome(){
        window.location = '/';
    }

    return(
        <>
        <div className="form">


        <Form onSubmit = {handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <input className="input" type = "email" name = "userName" placeholder = "Enter your email"
                        value = {inputs.userName || ''} onChange = {handleChange} 
                        required></input>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <input className="input" type = "password" name = "password" placeholder = "Enter password"
                        value = {inputs.password || ''} onChange = {handleChange}
                        required></input>
            </Form.Group>

            <center>
            <Button variant="primary" type="submit">Submit</Button>&nbsp;&nbsp;
            <Button variant="danger" onClick = {goToHome} >Cancel</Button>
            </center>

        </Form>

        </div>
        </>
    );

};
export default LoginForm;