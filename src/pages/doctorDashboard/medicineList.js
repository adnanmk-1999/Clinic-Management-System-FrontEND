import React from "react"
import {Link} from "react-router-dom"
import {useState,useEffect} from "react"
import axios from "axios";
import { Card, Button } from 'react-bootstrap';
import "./doctor.css";


function MedicineList(props){
  const[patient, setPatient]=useState([]);
  //fetching data data in patients from patient table
  useEffect(()=>{
    axios
    .get(`http://localhost:4000/patients/${props.details.patientId}`)
    .then(response=>{
        console.log('Promise was fullfilled')
        console.log(response)
        setPatient(response.data)
    })},[props.details.patientId])

  return(
    <>
    { patient.patientId === props.details.patientId &&
    <div className="forDoctorPage">
    <Card className="text">
        <Card.Header> Medicine Name : {props.details.medicineName}</Card.Header>
          <Card.Body>
          <div className="floatright">
          <Button variant="primary"><Link to={`/priscdetails/${props.details.medicineid}`}>View Details</Link></Button>
          </div>
          </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
    </Card>
    </div>
    }
    </>
  )
}
export default MedicineList;