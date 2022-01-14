import {useState, useEffect} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import "./doctor.css";
import roleController from "../../helpers/roleLogin/roleLogin";
import dates from '../../helpers/todayDate/getDate';


    
function MedicineEdit(){
    if(!roleController.isDoctor()){
        window.location = '/login'
      }

    const {id} = useParams();
    return (
        <>
        <center><h1>Edit Medicine</h1></center>
        <MyForm medicineid = {id}/>
        </>
    );
}

function MyForm(props){
    

    const [inputs, setInputs] = useState({});
        //To get the staff details from the staff id
        useEffect(() => {
            axios.get(`http://localhost:4000/medicines/${props.medicineid}`) //gets data from staff
              .then(response =>{
                  console.log('Promise fullfilled');
                  console.log(response); 
                  setInputs(response.data);            
              })
        },[props.medicineId]);

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name] : value}))
    };

    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs);

        axios.put(`http://localhost:4000/medicines/${props.medicineid}`, inputs)
            .then(response => { 
                    console.log('Promise Fullfilled');
                    console.log(response);
                    alert('Medicine updated !')
                    window.location = `/patientdetails/${inputs.patientId}`
            })
    };

    return(
        <>
        <div className="form">

        <Form onSubmit = {handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
                <input className="input" type = "hidden" name = "patientId" placeholder = "Enter Patient Id"
                        value = {inputs.patientId || ''} onChange = {handleChange} 
                        required></input>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Medicine Name</Form.Label>
                <input className="input" type = "text" name = "medicineName" placeholder = "Enter Medicine Name"
                        value = {inputs.medicineName || ''} onChange = {handleChange} 
                        required></input>
            </Form.Group>

            
            <Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
                <select name = 'unit' className="bld" value = {inputs.unit || ''} onChange = {handleChange}
                        required>
                    <option>Choose one</option>
                    <option value = 'mg'>MG</option>
                    <option value = 'ml'>ML</option>
                    </select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Dose</Form.Label>
            <input className="input" type = "text" name = "dose"
                        value = {inputs.dose || ''} onChange = {handleChange}
                        required></input>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Type</Form.Label>
            <input className="input" type = "text" name = "type"
                        value = {inputs.type || ''} onChange = {handleChange}
                        required></input>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Day</Form.Label>
            <input className="input" type = "text" name = "day" placeholder = "Number of Days"
                        value = {inputs.day || ''} onChange = {handleChange} 
                        required></input>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Comments</Form.Label>
            <input className="input" type = "text" name = "comment"
                        value = {inputs.comment || ''} onChange = {handleChange} 
                        required></input>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Date of Medicine</Form.Label>
            <input className="input" type = "date" name = "dateMedicine"
                        value = {inputs.dateMedicine || ''} onChange = {handleChange} //validate for current date only
                        min = {dates.getDate()} 
                        max = {dates.getDate()}
                        required></input>
            </Form.Group>
            <center>
            <Button variant="primary" type="submit">SAVE</Button>
           
            </center>
            </Form>
        </div>
        </>
    );

};
export default MedicineEdit;