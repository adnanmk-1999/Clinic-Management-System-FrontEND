import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
//because we are using parameter in URL to catch the details
import { useNavigate } from 'react-router-dom';
import {Button, Card} from 'react-bootstrap'
import roleController from '../../helpers/roleLogin/roleLogin';
import './admin.css';

function StaffDetails(){

  if(!roleController.isAdmin()){
    window.location = '/login'
  }
    
    //Initialize the use state, to store data
    const [staff, setStaff] = useState([]);
    //get id from URL for fetching
    const {staffId} = useParams();
    console.log(staffId)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4000/staffs/${staffId}`) //gets data from staff
          .then(response =>{
              console.log('Promise fullfilled');
              console.log(response);             
              setStaff(response.data);
          })
    },[staffId]);
    
    return(
      <>
      <div className = "staffCards">
        <center><h1>Staff Details</h1></center>
         <Card className="text">
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title>
            <h4>Staff Name : {staff.staffName}</h4>
            <h4>Staff Type : {staff.staffType}</h4>
            <h4>Qualification : {staff.qualification}</h4>
            <h4>Gender : {staff.gender}</h4>
            <h4>Date of Birth : {staff.dateOfBirth}</h4>
            <h4>Address : {staff.address}</h4>
            <h4>Date of Join : {staff.dateOfJoin}</h4>
            <h4>Phone : {staff.phone}</h4>
            <h4>Email : {staff.email}</h4>
            <h4>Experience : {staff.experience}</h4>
            </Card.Title>
            <center><Button type ='button' id = 'edit' onClick = {() =>navigate(`/staffedit/${staff.staffId}`)}>Edit Staff</Button>
            &nbsp;&nbsp;
            <Button variant = "danger" type = "button" id = "delete" 
          onClick = {() => DeleteStaff(staff.staffId)}>Delete</Button></center>
          </Card.Body>
        </Card>
        <a className = 'staffDetails' href = '/stafflist'>Go back</a>
      </div>
      </>
    );
};

function DeleteStaff(staffId){
  axios.delete(`http://localhost:4000/staffs/${staffId}`)
    .then(response => {
      console.log('Promise fullfilled');
      console.log(response);  
  })
  window.location = '/stafflist'; //after deletion goes to this page
}

  
export default StaffDetails;
