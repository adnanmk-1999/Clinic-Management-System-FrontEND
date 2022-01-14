import {useState, useEffect} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import roleController from '../../helpers/roleLogin/roleLogin';
import dates from '../../helpers/todayDate/getDate';

function StaffEdit(){
    const {staffId} = useParams();
    return (
        <>
        <center><h1>Edit Staff</h1></center>
        <MyForm staffId = {staffId}/>
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
            axios.get(`http://localhost:4000/staffs/${props.staffId}`) //gets data from staff
              .then(response =>{
                  console.log('Promise fullfilled');
                  console.log(response); 
                  setInputs(response.data);            
              })
        },[props.staffId]);

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name] : value}))
    };

    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs);

        axios.put(`http://localhost:4000/staffs/${props.staffId}`, inputs)
            .then(response => { 
                    console.log('Promise Fullfilled');
                    console.log(response);
                    alert('Staff details updated !')
                    window.location = '/stafflist'
            })
    };

    function goToDetails(){
        window.location = `/staffdetails/${props.staffId}`;
    }

    return(
        <>
        <div className="form">

        <Form onSubmit = {handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Full Name</Form.Label>
                <input className="input" type = "text" name = "staffName" placeholder = "Enter full name"
                        value = {inputs.staffName || ''} onChange = {handleChange} 
                        minLength="3" maxLength="15"
                        required></input>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Staff type</Form.Label>
                <select name = 'staffType' className="bld" value = {inputs.staffType || ''} onChange = {handleChange} required>
                    <option value = 'admin' onChange = {handleChange}>Admin</option>
                    <option value = 'doctor' onChange = {handleChange}>Doctor</option>
                    <option value = 'frontOffice' onChange = {handleChange}>Front Office</option>
                    <option value = 'labTechnician' onChange = {handleChange}>Lab Technician</option>
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
                        value = {inputs.dateOfBirth || ''} onChange = {handleChange} max = {dates.childLabour()}
                        min="1961-01-01" max="2003-12-31"
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
export default StaffEdit;