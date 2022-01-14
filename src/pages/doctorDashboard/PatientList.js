import React from "react"
import {Link} from "react-router-dom"
import {useState,useEffect} from "react"
import axios from "axios";
import { Card, Button } from 'react-bootstrap';
import './doctor.css'

function PatientList(props){
  const[patients, setPatients]=useState([]);
  //fetching data data in patients from patient table
  useEffect(()=>{
    axios
    .get(`http://localhost:4000/patients/${props.details.patientId}`)
    .then(response=>{
        console.log('Promise was fullfilled')
        console.log(response)
        setPatients(response.data)
    })},[props.details.patientId])

  //fetching data of doctors based on email
    const[doctor, setDoctor] = useState([]);
    useEffect(()=>{
        var email = localStorage.getItem('myemail');
        console.log(email)
        axios
        .get(`http://localhost:4000/doctors/doctoremail/${email}`)
        .then(response=>{
            console.log('Promise was fullfilled')
            console.log(response.data)
            setDoctor(response.data[0])

        })
    },[]);  
    console.log(doctor)  


  return(
    <>
    { doctor.doctorId === props.details.doctorId &&
    <div className="forDoctorPage">
    <Card className="text">
        <Card.Header> Patient Name : {patients.patientName}</Card.Header>
          <Card.Body>
          <Card.Title>Appoinment Time : {props.details.appointmentTime}</Card.Title>
          <div className="floatright">
          <Button variant="primary"><Link to={`/patientdetails/${props.details.patientId}`}>View Details</Link></Button>
          </div>
          </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
    </Card>
    </div>
    }
    </>
  )
}
export default PatientList;