import { Link } from "react-router-dom"
import { Button, Card } from 'react-bootstrap'
import './front.css'

function Appointment(props) {

    console.log(props)
    return (
        <div className="whole_width">
            <br />
            <Card className="text-center">
                <Card.Header>Appointment Details of {props.details.patientName}</Card.Header>
           <Card.Body>
               <Card.Title>Full Name : {props.details.patientName}</Card.Title>
            <Button >
                <Link to={`/appointmentView/${props.details.id}`}>
                    View
                </Link>
            </Button>
          {' '}
          {' '}
            <Button variant="danger" >
                <Link to={`/appointmentDelete/${props.details.id}`}>
                    Cancel
                </Link>
            </Button>
            </Card.Body>
        </Card>
        </div>
    )
}
export default Appointment;