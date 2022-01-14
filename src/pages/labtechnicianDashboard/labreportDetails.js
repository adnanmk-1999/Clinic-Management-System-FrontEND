import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
//because we are using parameter in URL to catch the details
import { useNavigate } from 'react-router-dom';
import roleController from '../../helpers/roleLogin/roleLogin';

function ReportDetails(){

    if(!roleController.isLabtechnician()){
      window.location = '/login'
    }
    
    //Initialize the use state, to store data
    const [test, setTest] = useState([]);
    //get id from URL for fetching
    const {labReportId} = useParams();
    console.log(labReportId)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4000/reports/${labReportId}`) //gets data from test
          .then(response =>{
              console.log('Promise fullfilled');
              console.log(response);             
              setTest(response.data);
          })
    },[labReportId]);
    
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

    function goToDetails(){
      window.location = `/reportlist`;
  }

    return(
      <>
      <div>
        <center><h1>Test Details</h1></center>
        <div className = "cardsList">
        <Card className="text">
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title>
            <h4>Test Name : {test.testName}</h4>
            <h4>Description : {test.description}</h4>
            <h4>Patient Name : {patient.patientName}</h4>
            <h4>Result Value : {test.resultValue}</h4>
            <h4>Remarks : {test.remarks}</h4>
            <h4>Date : {test.reportDate}</h4>
            </Card.Title>
            <center><Button variant="primary" type ='button' id = 'edit' onClick = {() =>navigate(`/reportedit/${test.labReportId}`)}>Edit</Button>
        &nbsp;&nbsp;
        <Button variant="danger" onClick = {goToDetails} >Cancel</Button></center>
          </Card.Body>
        </Card>
        </div>
        <a href = '/reportlist'>Go back</a>
      </div>
      </>
    );
};

export default ReportDetails;
