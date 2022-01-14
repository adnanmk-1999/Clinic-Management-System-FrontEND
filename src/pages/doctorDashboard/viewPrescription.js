import {useState,useEffect} from "react"
import axios from "axios";
import Medicines from './medicineList'
import "./doctor.css";
import roleController from "../../helpers/roleLogin/roleLogin";


function Prescription(){

   if(!roleController.isDoctor()){
        window.location = '/login'
      }
  //searching  doctor based on the email in local storage
       const[medicine, setMedicine] = useState([]);
       var today = new Date();
       var dd = String(today.getDate()).padStart(2, '0');
       var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
       var yyyy = today.getFullYear();

       today = yyyy + '-' + mm + '-' + dd;
       console.log(today);
     //viewing the patients for the current date
     useEffect(() => {
        
        axios.get(`http://localhost:4000/medicines/bydate/${today}`) //gets data from api
          .then(response =>{
              console.log('Promise fullfilled'); //if data recieved, output 
              console.log(response);             //display output (responce)
              setMedicine(response.data); //save only 'data' in response to the state
          })
    },[]);

  //mapping the appoinments
        return(<>
       
        <div>
        <center><h2>Prescription</h2></center>
            <div>{medicine.map(med=>
                    <div key={med.medicineid}> 
                        <Medicines details= {med}/>
                    </div>)}
                </div>
        </div>
                
    </>
    )
   
   }

export default Prescription;