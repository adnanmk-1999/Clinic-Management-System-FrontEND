import {useState,useEffect} from "react"
import axios from "axios";
import Patients from './PatientList'
import roleController from "../../helpers/roleLogin/roleLogin";

function Listall(){

    if(!roleController.isDoctor()){
        window.location = '/login'
      }
  //searching  doctor based on the email in local storage
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
    const[appoinments, setAppoinments]=useState([]);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
     //viewing the patients for the current date
    useEffect(()=>{

        setTimeout(() => {
           axios
        .get(`http://localhost:4000/appointments/bydate/${today}`)
        .then(response=>{
            console.log('Promise was fullfilled')
            console.log(response.data)
            setAppoinments(response.data)
        }) 
        },[]);

    },[]);
  //mapping the appoinments
        return(<>
        { doctor === undefined ? (goBack()) :
        (<div>
        <center><h2>Appointments</h2></center>
        <center><h2>Dr. {doctor.doctorName} </h2></center>
        <h3>Date : {today}</h3>

            <div>{appoinments.map(appoinment=>
                    <div key={appoinment.id}> 
                        <Patients details= {appoinment}/>
                    </div>)}
                </div>
        </div>)
        }
                
    </>
    )

    function goBack(){
        alert("You are not registered ! contact admin. ");
        window.location = '/'
    }
   
   }

export default Listall;