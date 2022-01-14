import {useState} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import roleController from '../../helpers/roleLogin/roleLogin';


function RegisterUser(){
    return (
        <>
       <center> <h1>Register User</h1></center>
        <MyForm/>
        </>
    );
}

function MyForm(props){

    if(!roleController.isAdmin()){
        window.location = '/login'
      }
  

    const [inputs, setInputs] = useState({});

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name] : value}))
    };

    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs);

        axios.post(`users/register`, inputs)
            .then(response => { 
                alert("User registered !")
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
            <input className="input" type = "password" name = "password" placeholder = "Enter a strong password"
                        value = {inputs.password || ''} onChange = {handleChange}
                        minLength="6" maxLength="10"
                        required></input>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
                <select name = 'roleId' className="bld" onChange = {handleChange} required>
                    <option>Choose one</option>
                    <option value = "1" onChange = {handleChange}>Admin</option>
                    <option value = '2' onChange = {handleChange}>Doctor</option>
                    <option value = '3' onChange = {handleChange}>Front Office</option>
                    <option value = '4' onChange = {handleChange}>Lab Technician</option>
                </select>
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
export default RegisterUser;