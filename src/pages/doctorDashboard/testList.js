import React from "react"
import {useState,useEffect} from "react"
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {Button, Card} from 'react-bootstrap'
import "./doctor.css"

function TestList(props){
        const[patients, setPatients]=useState([]);

        const navigate = useNavigate();
        useEffect(()=>{
          axios
          .get(`http://localhost:4000/patients/${props.details.patientId}`)
          .then(response=>{
              console.log('Promise was fullfilled')
              console.log(response)
              setPatients(response.data)
          })},[props.details.patientId])



  return(
    <div className="forDoctorPage">
    <Card className="text">
  <Card.Header> Lab Report of Test : {props.details.testName}</Card.Header>
  <Card.Body>
    <Card.Title> Patient Name :{patients.patientName}</Card.Title>
    <Card.Text>
    </Card.Text>
    <div className = "floatright">
    <Button variant="primary" onClick ={() => navigate(`/patient/labresult/${props.details.labReportId}`)}>View Details</Button>
    </div>
  </Card.Body>
  <Card.Footer className="text-muted"></Card.Footer>
</Card>
</div>
)
}

export default TestList;