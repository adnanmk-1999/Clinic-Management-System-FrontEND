import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Button, Card} from 'react-bootstrap'
import roleController from '../../helpers/roleLogin/roleLogin';

//because we are using parameter in URL to catch the details
import { useNavigate } from 'react-router-dom';

function TestDetails(){

    if(!roleController.isLabtechnician()){
      window.location = '/login'
    }
    
    //Initialize the use state, to store data
    const [test, setTest] = useState([]);
    //get id from URL for fetching
    const {testId} = useParams();
    console.log(testId)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4000/tests/${testId}`) //gets data from test
          .then(response =>{
              console.log('Promise fullfilled');
              console.log(response);             
              setTest(response.data);
          })
    },[testId]);
    
    const [patient, setPatient] = useState([]);
    useEffect(() => {
     setTimeout(() => {
      axios.get(`http://localhost:4000/patients/${test.patientId}`) //gets data from test
        .then(response =>{
            console.log('Promise fullfilled');
            console.log(response);             
            setPatient(response.data);
        })
      },100);
  },[test.patientId]);
    
    return(
      <>
      <div className = "cardsList">
        <Card className="text">
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title>
            <h4>Test Name : {test.testName}</h4>
            <h4>Description : {test.description}</h4>
            <h4>Patient Name : {patient.patientName}</h4>
            </Card.Title>
            <center><Button variant = "primary" type ='button' onClick = {() =>navigate(`/generatereport/${test.testId}`)}>Begin test</Button></center>
          </Card.Body>
        </Card>

      </div>
       <a href = '/testList'>Go back to test list</a>
      </>
    );
};

export default TestDetails;
