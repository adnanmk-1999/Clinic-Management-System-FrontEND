import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Form, Button } from 'react-bootstrap';
import roleController from "../../helpers/roleLogin/roleLogin";
import dates from "../../helpers/todayDate/getDate";


function PatientEdit() {

    if(!roleController.isFrontoffice()){
        window.location = '/login'
      }

    const { patientId } = useParams()
    return (
        <div>
           <center> <h1>Patient Edit</h1></center>
            <MyForm patientId={patientId} />
        </div>
    )


    function MyForm(props) {

        const [Inputs, setInputs] = useState([])

        useEffect(() => {

            axios.get(`http://localhost:4000/patients/${props.patientId}`)
                .then(response => {
                    console.log('Promise fullfilled');
                    console.log(response)
                    setInputs(response.data)
                })
        }, [props.patientId])

        function handleChange(event) {
            const name = event.target.name;
            const value = event.target.value;
            setInputs(values => ({ ...values, [name]: value }))
        }

        function handleSubmit(event) {
            event.preventDefault();
            console.log(Inputs);

            axios.put(`http://localhost:4000/patients/${props.patientId}`, Inputs)
                .then(response => {
                    console.log('Promise fullfilled');
                    console.log(response);
                    setInputs(response.data)
                    alert('patient details has been updated')
                    window.location = '/patientDisplay';
                })
        }


        function goToHome(){
            window.location = '/patientDisplay';
        }
 
    
        return (
            <div className="form">

            <Form onSubmit = {handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Full Name</Form.Label>
                    <input className="input" type = "text" name = "patientName" placeholder = "Enter full name"
                            value = {Inputs.patientName || ''} onChange = {handleChange} 
                            minLength="3" maxLength="15"
                            required></input>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Date of Birth</Form.Label>
                <input className="input" type = "text" name = "dateOfBirth"
                            value = {Inputs.dateOfBirth || ''} onChange = {handleChange}
                            onFocus={(e) => (e.currentTarget.type = "date")}
                            onBlur={(e) => (e.currentTarget.type = "text")}
                            max = {dates.getDate()}
                            required></input>
                </Form.Group>
    
               
     
                <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Address</Form.Label>
                <input className="input" type = "text" name = "address" placeholder = "Enter Address"
                            value = {Inputs.address || ''} onChange = {handleChange} 
                            maxLength="30"
                            required></input>
                </Form.Group>
    
               
    
                <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Phone</Form.Label>
                <input className="input" type = "tel" name = "phoneNumber" placeholder = "Enter phone number"
                            value = {Inputs.phoneNumber || ''} onChange = {handleChange} 
                            required></input>
                </Form.Group>
    
                <center>
                <Button variant="primary" type="submit"  >Submit</Button>&nbsp;&nbsp;
                <Button variant="danger" onClick = {goToHome} >Cancel</Button>
                </center>
    
            </Form>
    
            </div>
        )
    }
}
export default PatientEdit;