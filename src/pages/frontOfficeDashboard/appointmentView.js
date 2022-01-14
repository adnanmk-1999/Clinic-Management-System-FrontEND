import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Button, Card } from 'react-bootstrap'
import roleController from "../../helpers/roleLogin/roleLogin";

//destructuring react to get only useState
function AppointmentView() {

    if (!roleController.isFrontoffice()) {
        window.location = '/login'
    }

    const [Inputs, setInputs] = useState([])
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {

        axios.get(`http://localhost:4000/appointments/${id}`)
            .then(response => {
                console.log('Promise fullfilled');
                console.log(response);

                setInputs(response.data)
            })
    }, [id])

    const [Input, setInput] = useState([])
    useEffect(() => {

        setTimeout(() => {
            axios.get(`http://localhost:4000/doctors/${Inputs.doctorId}`)
                .then(response => {
                    console.log('Promise fullfilled');
                    console.log(response);

                    setInput(response.data)
                    console.log(Input.doctorName)
                })
        }, 100);
    }, [Inputs.doctorId]);



    return (<>
        <div>
            <Card className="text-center">
                <Card.Header>{Inputs.patientName}</Card.Header>
                <Card.Body>
                    <Card.Title>
                        <h3>Details of Appointments</h3>
                        <hr />

                        <h4> Full Name: {Inputs.patientName}</h4>
                        <h4>Doctor: {Input.doctorName}</h4>
                        <h4>Appointment Date: {Inputs.appointmentDate}</h4>
                        <h4>Time: {Inputs.appointmentTime}</h4>
                    </Card.Title>

                    <center><Button onClick={() => navigate(`/appointmentDisplay`)} >  Go Back to Appointment List</Button></center>

                </Card.Body>
            </Card>
        </div>
    </>);
}
export default AppointmentView;