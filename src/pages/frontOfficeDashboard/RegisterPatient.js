import {useState} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import roleController from '../../helpers/roleLogin/roleLogin';

function RegisterPatient(){
    return (
        <>
       <center> <h1>Register Patient</h1></center>
        <MyForm/>
        </>
    );
}

function MyForm(props){

    if(!roleController.isFrontoffice()){
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

        axios.post(`http://localhost:4000/patients`, inputs)
            .then(response => { 
               setInputs(response.data);
               alert('patient registered successfully');
              window.location='/patientDisplay'
            })
    };

    function goToHome(){
        window.location = '/';
    }

    return(
        <>
        <div className="form">

        <Form onSubmit = {handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Full Name</Form.Label>
                <input className="input" type = "text" name = "patientName" placeholder = "Enter full name"
                        value = {inputs.patientName || ''} onChange = {handleChange} 
                        minLength="3" maxLength="15"
                        required></input>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Date of Birth</Form.Label>
            <input className="input" type = "date" name = "dateOfBirth"
                        value = {inputs.dateOfBirth || ''} onChange = {handleChange} max = {getDate()}
                        required></input>
            </Form.Group>

           
            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Address</Form.Label>
            <input className="input" type = "text" name = "address" placeholder = "Enter Address"
                        value = {inputs.address || ''} onChange = {handleChange} 
                        maxLength="30"
                        required></input>
            </Form.Group>

           
            <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Phone</Form.Label>
            <input className="input" type = "text" name = "phoneNumber" placeholder = "Enter phone number"
                        value = {inputs.phoneNumber || ''} onChange = {handleChange} maxLength = '10'
                        required></input>
            </Form.Group>

            <center>
            <Button variant="primary" type="submit"  >Submit</Button>&nbsp;&nbsp;
            <Button variant="danger" onClick = {goToHome} >Cancel</Button>
            </center>

        </Form>

        </div>
        </>
    );


    function getDate(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today
    }

};
export default RegisterPatient;