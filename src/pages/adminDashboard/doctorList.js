import {useState, useEffect} from 'react';
import axios from 'axios';
import Doctor from './doctor';
import roleController from '../../helpers/roleLogin/roleLogin';
import './admin.css';


function DoctorList(){
    
    if(!roleController.isAdmin()){
      window.location = '/login'
    }

    //Initialize the use state, to store data
    const [staffs, setStaffs] = useState([]);

    //Initialize the use state for searching
    const [search, setSearch] = useState('')

    //Only fetch the data after some time, after every other component
    //is loaded. eg: adds are only loaded after loading the components of page 
    useEffect(() => {
        
        axios.get('http://localhost:4000/doctors') //gets data from api
          .then(response =>{
              console.log('Promise fullfilled'); //if data recieved, output 
              console.log(response);             //display output (responce)
              setStaffs(response.data); //save only 'data' in response to the state
          })
    },[]);
    
    return(
      <>
      <div>
        <center><h1>Doctor List</h1></center>

        &nbsp;&nbsp;<input type='text' 
          name='search' placeholder='Search'
          onChange={event =>setSearch(event.target.value)} /><br/><br/>

        {staffs.length === 0 ? (<h3>No Doctors registered !</h3>) : ( 
          <div className = "staffCards">
          {staffs.filter((staff) => {
              if (search === ''){
                return staff
              }
              else if (staff.doctorName.toLowerCase().includes(search.toLowerCase())){
                return staff
              }
            }).map(staff => 
                  <div key = {staff.doctorId}>
                      <Doctor details = {staff}/>
                  </div>
              )}
      </div>
      )}

      </div>
      </>
    );
};
  
export default DoctorList;