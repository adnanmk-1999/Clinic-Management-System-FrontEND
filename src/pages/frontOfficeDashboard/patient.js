import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap'
import { Card } from "react-bootstrap"


function Patient(props) {

    console.log(props)
    return (
        <>
            <center>
                <div >

                    <br />
                    <Card className="text-center">
                 
                      <Card.Header>  <h3 > Full Name : {props.details.patientName}</h3></Card.Header>
                      <Card.Body>
                    <Button >
                        <Link to={`/patientView/${props.details.patientId}`}>
                            View Details
                        </Link>
                    </Button>
                    {'  '}

                    <Button variant="danger" >
                        <Link to={`/PatientDelete/${props.details.patientId}`}>
                            Delete Patient
                        </Link>
                    </Button>
                    {'    '}

                    <Button variant="secondary" >
                        <Link to={`/billGenerate/${props.details.patientId}`}>
                            Generate Bill
                        </Link>
                    </Button>
                    </Card.Body>
                    </Card>
                </div>
            </center>
        </>
    )
}
export default Patient;