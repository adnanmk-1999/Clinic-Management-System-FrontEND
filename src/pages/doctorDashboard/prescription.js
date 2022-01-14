
import { useParams } from "react-router";
import MedicineForm from './medicineForm';
import TestForm from './testPatient';
import "./doctor.css";
import roleController from "../../helpers/roleLogin/roleLogin";


function Prescription(){

    if(!roleController.isDoctor()){
        window.location = '/login'
      }
 //prescription form by calling medicine form and test form by passing patient id as parameter
    const {id} = useParams();
    console.log(id)
   return (
        <>
        <center><h1>Prescription</h1></center>
        <br/>
        <MedicineForm details = {id}/> 
        <hr/>
        <TestForm patient = {id}/>      
        </>
    );
}




export default Prescription;