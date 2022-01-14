import {useState} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import roleController from '../../helpers/roleLogin/roleLogin';
import dates from '../../helpers/todayDate/getDate';

function RegisterEvent(){
    return (
        <>
        <center><h1>Register Event</h1></center>
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

        axios.post(`http://localhost:4000/events`, inputs)
            .then(response => { 
                    console.log('Promise Fullfilled');
                    console.log(response);
                    window.location = '/eventlist';
                   
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
                <Form.Label>Event Name</Form.Label>
                <input className="input" type = "text" name = "eventName" placeholder = "Enter event name"
                        value = {inputs.eventName || ''} onChange = {handleChange} 
                        required></input>
            </Form.Group>



            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>description</Form.Label>
            <input className="input" type = "text" name = "description" placeholder = "Enter description"
                        value = {inputs.description || ''} onChange = {handleChange} 
                        required></input>
            </Form.Group>



            <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Date of Event</Form.Label>
            <input className="input" type = "date" name = "dateOfEvent"
                        value = {inputs.dateOfEvent || ''} onChange = {handleChange} min = {dates.getDate()}
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
export default RegisterEvent;