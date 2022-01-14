import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import {useParams} from 'react-router';
import roleController from '../../helpers/roleLogin/roleLogin';
import dates from '../../helpers/todayDate/getDate';


function PatientAppointment() {
    return (
        <>
            <center><h1>Patient Appointment</h1></center>
            <MyForm />
        </>
    );
}

function MyForm(props) {

    if(!roleController.isFrontoffice()){
        window.location = '/login'
      }

    const[inputs, setInputs]=useState([]);

    const[doctor, setDoctor]=useState([]);

    const {patientId} = useParams()

    console.log(patientId)
    useEffect(()=>{
        axios
        .get(`http://localhost:4000/patients/${patientId}`)
        .then(response=>{
            console.log('Promise was fullfilled')
            console.log(response)
            setInputs(response.data)

        })},[patientId])


    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    };

    function handleChange1(event) {
        const name = event.target.name;
        const value = event.target.value;
        setDoctor(values => ({ ...values, [name]: value }))
    };


    //Adding appointment
    function handleSubmit(event) {
        event.preventDefault();
        console.log(inputs);
        console.log(doctor)

        axios.post(`http://localhost:4000/appointments`, inputs)
            .then(response => {
               // localStorage.setItem('mytoken', response.data.accessToken)
               setInputs(response.data);
               alert('Appointment confirmed');
               window.location='/appointmentDisplay'
            })
    };

    //Adding the doctor details in the appointments table
    function handleSubmit1(event){
        event.preventDefault();
        axios.get(`http://localhost:4000/doctors/doctor/${doctor.doctorName}`)
            .then(response => { 
                console.log(response);
                if(response.data.length === 0){
                    alert('Doctor Not Registered !')
                }
                else{
                    alert('Doctor Exits ! Add Doctor')
                    setDoctor(response.data)
                    var doctor1 = doctor[0].doctorId
                        console.log(doctor1)
                        const name = 'doctorId';
                        const value = doctor1;
                    setTimeout(() => {
                        setInputs(values => ({ ...values, [name]: value }))
                        console.log(inputs)
                    },500) 

                
                }
            })
            .catch(error => {
                if(error.response){
                    alert(error.response.data)  //=> response payload
                }
            })
    };



    function goToHome() {
        window.location = '/';
    }


    return (
        <>
        <div className="form">

        <Form onSubmit = {handleSubmit1}>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Doctor Name</Form.Label>
                <input className="input" type="text" name="doctorName" placeholder="Enter doctor name"
                            value={doctor.doctorName || ''} onChange={handleChange1}
                            minLength="3" maxLength="15"
                            required></input>
            </Form.Group>

            <Button variant="primary" type="submit">Check</Button>&nbsp;&nbsp;
                
            <Button variant="danger" type = "submit" >Add Doctor</Button>
                       
            </Form>


        <Form onSubmit = {handleSubmit}>

        <Form.Group className="mb-3" controlId="formBasicText">
                <input className="input" type="hidden" name="patientId" placeholder="Enter patient name"
                            value={inputs.patientId || ''} onChange={handleChange}
                            required></input>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Patient Name</Form.Label>
                <input className="input" type="text" name="patientName" placeholder="Enter patient name"
                            value={inputs.patientName || ''} onChange={handleChange}
                            required></input>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <input className="input" type="hidden" name="doctorId" placeholder="Enter doctor name"
                            value={inputs.doctorId || ''} onChange={handleChange}
                            required></input>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Appointment Date</Form.Label>
            <input className="input" type="date" name="appointmentDate" 
                            value={inputs.appointmentDate || ''} onChange={handleChange}
                            min = {dates.getDate()}
                            required></input>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTime">
            <Form.Label>Appointment Time</Form.Label>
            <input className="input" type="time" name="appointmentTime" min="09:00" max="18.00"
                            value={inputs.appointmentTime || ''} onChange={handleChange}
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
export default PatientAppointment;