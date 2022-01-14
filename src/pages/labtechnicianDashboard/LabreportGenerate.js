import {useState, useEffect} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import roleController from '../../helpers/roleLogin/roleLogin';

function GenerateReport(){

    if(!roleController.isLabtechnician()){
        window.location = '/login'
      }

    const {testId} = useParams();
    return (
        <>
        <center><h1>Enter LabTest Results</h1></center>
        <MyForm testId = {testId}/>
        </>
    );
}

function MyForm(props){
    const [inputs, setInputs] = useState({});
        //To get the staff details from the staff id
        useEffect(() => {
            axios.get(`http://localhost:4000/tests/${props.testId}`) //gets data from staff
              .then(response =>{
                  console.log('Promise fullfilled');
                  console.log(response); 
                  setInputs(response.data);            
              })
        },[props.testId]);

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name] : value}))
    };

    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs);

        axios.post(`http://localhost:4000/reports`, inputs)
            .then(response => { 
                    console.log('Promise Fullfilled');
                    console.log(response);
                    alert('Lab Report Submitted !') 
                    window.location = '/reportlist';    
            })
    };

    function goToDetails(){
        window.location = `/testdetails/${props.testId}`;
    }

    return(
        <>
        <div className="form">
        <Form onSubmit = {handleSubmit}>

        <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Test Name</Form.Label>
                <input className="input" type = "text" name = "testName" placeholder = "Enter Test Name"
                        value = {inputs.testName || ''} onChange = {handleChange} 
                        minLength="3" maxLength="20"
                        required></input>
            </Form.Group>
           
            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Description</Form.Label>
            <input className="input" type = "text" name = "description"
                        value = {inputs.description || ''} onChange = {handleChange}
                        minLength="3" maxLength="30"
                        required></input>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Report Date</Form.Label>
            <input className="input" type = "date" name = "reportDate"
                        value = {inputs.reportDate || ''} onChange = {handleChange}
                        required></input>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Desired Range</Form.Label>
            <input className="input" type = "text" name = "desiredRange" placeholder = "eg. 1000-2000"
                        value = {inputs.desiredRange || ''} onChange = {handleChange}
                        required></input>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Result Value</Form.Label>
            <input className="input" type = "text" name = "resultValue" placeholder = "Enter the obtained value"
                        value = {inputs.resultValue || ''} onChange = {handleChange}
                        required></input>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Remarks</Form.Label>
            <input className="input" type = "text" name = "remarks" placeholder = "Enter the comments"
                        value = {inputs.remarks || ''} onChange = {handleChange}
                        maxLength="30"
                        required></input>
            </Form.Group>
       
            <center>
            <Button variant="primary" type="submit">Submit</Button> &nbsp;&nbsp;
            <Button variant="danger" onClick = {goToDetails} >Cancel</Button>
            </center>
            </Form>
            </div>
            </>
    )
}
export default GenerateReport;