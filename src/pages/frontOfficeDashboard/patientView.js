import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Button } from 'react-bootstrap'
import { Card } from "react-bootstrap";
import './front.css'
import roleController from "../../helpers/roleLogin/roleLogin";

//destructuring react to get only useState
function PatientView() {

    if (!roleController.isFrontoffice()) {
        window.location = '/login'
    }

    const [Inputs, setInputs] = useState([])
    const { patientId } = useParams()
    const navigate = useNavigate();

    useEffect(() => {

        axios.get(`http://localhost:4000/patients/${patientId}`)
            .then(response => {
                console.log('Promise fullfilled');
                console.log(response);

                setInputs(response.data)
            })
    }, [patientId])

    return (<>
        <div className="billCards">
            <Card className="text-center">
                <Card.Header>{Inputs.patientName}</Card.Header>
                <Card.Body>
                    <h3>Deatils of {Inputs.patientName}</h3>
                    <Card.Title>
                        <h4> First Name : {Inputs.patientName}</h4>
                        <h4>Date of birth : {Inputs.dateOfBirth}</h4>
                        <h4>Address : {Inputs.address}</h4>
                        <h4>Phone Number : {Inputs.phoneNumber}</h4>
                    </Card.Title>


                    <Button variant="secondary" type="button"
                        onClick={() => navigate(`/patientEdit/${Inputs.patientId}`)} >
                        Edit Patient details
                    </Button>
                    {'   '}

                    <Button > <a href="/patientDisplay"> Go Back to Patient List</a></Button>
                </Card.Body>
            </Card>
        </div>
    </>);
}
export default PatientView;