import React from "react"
import {useState,useEffect} from "react"
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import "./doctor.css";
import roleController from "../../helpers/roleLogin/roleLogin";

function PatientDetails(){

  if(!roleController.isDoctor()){
    window.location = '/login'
  }
  //viewing the patient details 
    const[patients, setPatients]=useState([]);
    const {id}=useParams()
    const navigate=useNavigate();
    useEffect(()=>{
        axios
        .get(`http://localhost:4000/appointments/patients/${id}`)
        .then(response=>{
            console.log('Promise was fullfilled')
            console.log(response)
            setPatients(response.data)
        })},[id])
        
    
    return(
        <div className="forDoctorPage">
        <Card className="text">
        <Card.Header>Patient Details</Card.Header>
        <Card.Body>
          <Card.Title> Patient Name :{patients.patientName}</Card.Title>
          <Card.Title> DOB :{patients.dateOfBirth}</Card.Title>
          <Card.Title> Address :{patients.address}</Card.Title>
          <Card.Title> Phone Number:{patients.phoneNumber} </Card.Title>
        <center>
        <Button variant="primary" onClick={()=>navigate(`/prescriptionadd/${patients.patientId}`)}>ADD CONSULTATION</Button>&nbsp;&nbsp;
        <Button variant="secondary" onClick={()=>navigate(`/patient/tests/${patients.patientId}`)}>VIEW LABRESULT</Button>&nbsp;&nbsp;
        <Button variant="secondary" onClick={()=>navigate(`/viewpriscription`)}>VIEW PRESCRIPTION</Button>
        </center>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
        </Card>
        <div><a href="/appointmentlist">Go Back</a></div>
        </div>

      )
    }

   
export default PatientDetails;