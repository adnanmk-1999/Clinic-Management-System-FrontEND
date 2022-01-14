import {useState} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import roleController from '../../helpers/roleLogin/roleLogin';
import dates from '../../helpers/todayDate/getDate';

function RegisterStaff(){
    return (
        <>
        <center><h1>Register Staff</h1></center>
        <MyForm/>
        </>
    );
}

function MyForm(props){

    if(!roleController.isAdmin()){
        window.location = '/login'
      }

    const [inputs, setInputs] = useState({});

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name] : value}))
    };

    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs);

        axios.post(`http://localhost:4000/staffs`, inputs)
            .then(response => { 
                    console.log('Promise Fullfilled');
                    console.log(response);
                    window.location = '/stafflist';
                   
            })
    };

    function goToHome(){
        window.location = '/';
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
                <select name = 'staffType' className="bld" onChange = {handleChange} required>
                    <option>Choose one</option>
                    <option value = 'admin' onChange = {handleChange}>Admin</option>
                    <option value = 'driver' onChange = {handleChange}>Driver</option>
                    <option value = 'frontOffice' onChange = {handleChange}>Front Office</option>
                    <option value = 'labTechnician' onChange = {handleChange}>Lab Technician</option>
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
                    <input type = "radio" name = "gender"
                        value = "male" onChange = {handleChange}
                        required></input>
                    <label className="rdo">Male</label> &nbsp;&nbsp;
                    <input type = "radio" name = "gender"
                        value = "female" onChange = {handleChange}
                        required></input>
                    <label className="rdo">Female</label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Date of Birth</Form.Label>
            <input className="input" type = "date" name = "dateOfBirth"
                        value = {inputs.dateOfBirth || ''} onChange = {handleChange}
                        min="1961-01-01" max={dates.childLabour()}
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
            <input className="input" type = "text" name = "phone" placeholder = "Enter phone number"
                        value = {inputs.phone || ''} onChange = {handleChange} minlength="10" maxlength="10"
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
            <Button variant="danger" onClick = {goToHome} >Cancel</Button>
            </center>

        </Form>


        </div>
        </>
    );

};
export default RegisterStaff;