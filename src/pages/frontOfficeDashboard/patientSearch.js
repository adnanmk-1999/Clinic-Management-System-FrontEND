import {useState} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import roleController from '../../helpers/roleLogin/roleLogin';

function Patientsearch(){

    return (
        <>
      <center>  <h1>Search Patient</h1></center>
        <MyForm/>
        </>
    );
}

function MyForm(props){

    if(!roleController.isFrontoffice()){
        window.location = '/login'
      }

    const [inputs, setInputs] = useState([]);

    const navigate = useNavigate();

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name] : value}))
    };

    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs);

        axios.get(`http://localhost:4000/patients/patient/${inputs.patientName}`)
            .then(response => { 
                console.log(response);
                if(response.data.length === 0){
                    alert('Patient Not Registered !')
                    window.location = '/registerPatient'
                }
                else{
                   setInputs(response.data);
                    alert('Patient Exits ! Add appointment')
                    console.log(inputs[0].patientId) 
                }
            })
            .catch(error => {
                if(error.response){
                    alert(error.response.data)  //=> response payload
                }
            })
    };

    return(
        <>
        <div className="form">

        <Form onSubmit = {handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Patient Name</Form.Label>
            <input className="input" type = "text" name = "patientName" placeholder = "Enter patient name"
                        value = {inputs.patientName || ''} onChange = {handleChange}
                        minLength="3" maxLength="15"
                        required></input>
            </Form.Group>

            <center>
            <Button variant="primary" type="submit">Check</Button>&nbsp;&nbsp;
            {inputs.length > 0 ? 
                <Button variant="danger" onClick = {() => navigate(`/patientappointment/${inputs[0].patientId}`)} >Add Appointment</Button> :
                console.log('Dummy')  }
            </center>
        </Form>

        </div>
        </>
    );

};
export default Patientsearch;