import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
//because we are using parameter in URL to catch the details
import { useNavigate } from 'react-router-dom';
import {Button, Card} from 'react-bootstrap'
import roleController from '../../helpers/roleLogin/roleLogin';
import './admin.css';

function EventDetails(){

  if(!roleController.isAdmin()){
    window.location = '/login'
  }
    
    //Initialize the use state, to store data
    const [staff, setStaff] = useState([]);
    //get id from URL for fetching
    const {id} = useParams();
    console.log(id)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4000/events/${id}`) //gets data from staff
          .then(response =>{
              console.log('Promise fullfilled');
              console.log(response);             
              setStaff(response.data);
          })
    },[id]);
    
    return(
      <>
      <div className = "staffCards">
        <center><h1>Event Details</h1></center>
         <Card className="text">
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title>
            <h4>Event Name : {staff.eventName}</h4>
            <h4>Description : {staff.description}</h4>
            <h4>Date of Event : {staff.dateOfEvent}</h4>
            </Card.Title>
            <center><Button type ='button' id = 'edit' onClick = {() =>navigate(`/eventedit/${staff.id}`)}>Edit</Button>
            &nbsp;&nbsp;
            <Button variant = "danger" type = "button" id = "delete" 
          onClick = {() => DeleteEvent(staff.id)}>Delete</Button></center>
          </Card.Body>
        </Card>
        <a className = 'staffDetails' href = '/eventlist'>Go back</a>
      </div>
      </>
    );
};

function DeleteEvent(id){
  axios.delete(`http://localhost:4000/events/${id}`)
    .then(response => {
      console.log('Promise fullfilled');
      console.log(response);  
  })
  window.location = '/eventlist'; //after deletion goes to this page
}

  
export default EventDetails;
