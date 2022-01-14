import React from "react"
import {useState,useEffect} from "react"
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import "./doctor.css";
import roleController from "../../helpers/roleLogin/roleLogin";


function PrescriptionDetails(){

     if(!roleController.isDoctor()){
         window.location = '/login'
       }
  //viewing the patient details 
    const[medicine, setMedicine]=useState([]);
    const {id}=useParams()
    const navigate=useNavigate();
    useEffect(()=>{
        axios
        .get(`http://localhost:4000/medicines/${id}`)
        .then(response=>{
            console.log('Promise was fullfilled')
            console.log(response)
            setMedicine(response.data)
        })},[id])
        
    
    return(
        <div className="forDoctorPage">
        <Card className="text">
        <Card.Header>Medicine Details</Card.Header>
        <Card.Body>
          <Card.Title> Medicine Name :{medicine.medicineName}</Card.Title>
          <Card.Title> Unit :{medicine.unit}</Card.Title>
          <Card.Title> dose :{medicine.dose}</Card.Title>
          <Card.Title> type :{medicine.type}</Card.Title>
          <Card.Title> day:{medicine.day} </Card.Title>
          <Card.Title> comment:{medicine.comment} </Card.Title>
        <center><Button variant="primary" onClick={()=>navigate(`/prescriptionedit/${medicine.medicineid}`)}>EDIT</Button></center>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
        </Card>
        <div><a href= "/appointmentlist">Go Back</a></div>
        </div>

      )
    }

   
export default PrescriptionDetails;