import {useState, useEffect} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import roleController from '../../helpers/roleLogin/roleLogin';
import dates from '../../helpers/todayDate/getDate';

function DoctorEdit(){
    const {doctorId} = useParams();
    return (
        <>
        <center><h1>Edit Staff</h1></center>
        <MyForm doctorId = {doctorId}/>
        </>
    );
}

function MyForm(props){
    
    if(!roleController.isAdmin()){
        window.location = '/login'
      }

    const [inputs, setInputs] = useState({});
        //To get the staff details from the staff id
        useEffect(() => {
            axios.get(`http://localhost:4000/doctors/${props.doctorId}`) //gets data from staff
              .then(response =>{
                  console.log('Promise fullfilled');
                  console.log(response); 
                  setInputs(response.data);            
              })
        },[props.doctorId]);

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name] : value}))
    };

    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs);

        axios.put(`http://localhost:4000/doctors/${props.doctorId}`, inputs)
            .then(response => { 
                    console.log('Promise Fullfilled');
                    console.log(response);
                    alert('Doctor details updated !')
                    window.location = '/doctorlist'
            })
    };

    function goToDetails(){
        window.location = `/doctordetails/${props.doctorId}`;
    }

    return(
        <>
        <div className="form">

        <Form onSubmit = {handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Full Name</Form.Label>
                <input className="input" type = "text" name = "doctorName" placeholder = "Enter full name"
                        value = {inputs.doctorName || ''} onChange = {handleChange} 
                        minLength="3" maxLength="15"
                        required></input>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Specialization</Form.Label>
                <select name = 'specialization' className="bld" value = {inputs.specialization || ''} onChange = {handleChange} required>
                    <option value = 'allergist' onChange = {handleChange}>Allergist</option>
                    <option value = 'anesthesiologist' onChange = {handleChange}>Anesthesiologist</option>
                    <option value = 'cardiologist' onChange = {handleChange}>Cardiologist</option>
                    <option value = 'surgeon' onChange = {handleChange}>Surgeon</option>
                    <option value = 'dermatologist' onChange = {handleChange}>Dermatologist</option>
                    <option value = 'physician' onChange = {handleChange}>Physician</option>
                    <option value = 'gastroenterologist' onChange = {handleChange}>Gastroenterologist</option>
                    <option value = 'others' onChange = {handleChange}>Others</option>
                    </select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Qualification</Form.Label>
            <input className="input" type = "text" name = "qualification" placeholder = "Enter qualification"
                        value = {inputs.qualification || ''} onChange = {handleChange} 
                        required></input>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Gender</Form.Label><br/>
                <select name = 'gender' className="bld" value = {inputs.gender || ''} onChange = {handleChange}>
                    <option value = 'male' onChange = {handleChange}>Male</option>
                    <option value = 'female' onChange = {handleChange}>Female</option>
                </select>

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Date of Birth</Form.Label>
            <input className="input" type = "date" name = "dateOfBirth"
                        value = {inputs.dateOfBirth || ''} onChange = {handleChange}
                        max = {dates.childLabour()}
                        required></input>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Address</Form.Label>
            <input className="input" type = "text" name = "address" placeholder = "Enter Address"
                        value = {inputs.address || ''} onChange = {handleChange} 
                        maxLength="30"
                        required></input>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Date of Join</Form.Label>
            <input className="input" type = "date" name = "dateOfJoin"
                        value = {inputs.dateOfJoin || ''} onChange = {handleChange} max = {dates.getDate()}
                        required></input>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Phone</Form.Label>
            <input className="input" type = "tel" name = "phone" placeholder = "Enter phone number"
                        value = {inputs.phone || ''} onChange = {handleChange} 
                        required></input>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Email</Form.Label>
            <input className="input" type = "email" name = "email" placeholder = "Enter email"
                        value = {inputs.email || ''} onChange = {handleChange} 
                        required></input>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Experience</Form.Label>
            <input className="input" type = "text" name = "experience" placeholder = "Enter experience"
                        value = {inputs.experience || ''} onChange = {handleChange} 
                        required></input>
            </Form.Group>

            <center>
            <Button variant="primary" type="submit">Submit</Button>&nbsp;&nbsp;
            <Button variant="danger" onClick = {goToDetails} >Cancel</Button>
            </center>

        </Form>
        </div>
        </>
    );

};
export default DoctorEdit;