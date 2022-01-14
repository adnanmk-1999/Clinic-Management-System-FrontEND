import {useState, useEffect} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import dates from '../../helpers/todayDate/getDate';

function TestForm(props){
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        axios
        .get(`http://localhost:4000/patients/${props.patient}`)
        .then(response=>{
            console.log('Promise was fullfilled')
            console.log(response)
            setInputs(response.data)
        })},[props.patient])

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name] : value}))
    };

    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs);
      //posting test to test table
        axios.post(`http://localhost:4000/tests`, inputs)
         .then(response=>{
            console.log('Promise was fullfilled')
            console.log(response)
            alert("Added Test ! Re-enter to add more !")
            })
    };

    return(
        <>
        <center><h2>Tests</h2></center>
        <div className="form">
            <Form onSubmit = {handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicText">
                      <input className="input" type = "hidden" name = "patientId" placeholder = "Enter Patient Id"
                             value = {inputs.patientId || ''} onChange = {handleChange} 
                             required></input>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Test Name</Form.Label>
                    <input className="input" type = "text" name = "testName" placeholder = "Enter Test Name"
                            value = {inputs.testName || ''} onChange = {handleChange} 
                            required></input>
                </Form.Group>
           
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Description</Form.Label>
                    <input className="input" type = "text" name = "description"
                           value = {inputs.description || ''} onChange = {handleChange}
                           required></input>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Date of Test</Form.Label>
                    <input className="input" type = "date" name = "testDate"
                            value = {inputs.testDate || ''} onChange = {handleChange}
                            min = {dates.getDate()} 
                            max = {dates.getDate()} 
                            required></input>
                </Form.Group>
       
                <center>
                <Button variant="primary" type="submit">ADD</Button> &nbsp;&nbsp;
                <Button variant="danger" type="button" onClick={()=>navigate(`/appointmentlist`)}>Finish</Button>
                </center>
            </Form>
        </div>
        </>)
        }
export default TestForm;