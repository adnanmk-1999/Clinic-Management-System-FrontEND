import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap'
import { Card } from "react-bootstrap"
import './front.css';


function Bill(props) {

    console.log(props)
    return (
        <>
            <center>
                <div >
                    <div className="forFront" >
                        <br />
                        <Card className="text-center">
                            <Card.Header>Bill Receipt</Card.Header>
                            <Card.Body>
                                <Card.Title> <h3 > Full Name : {props.details.patientName}</h3>  </Card.Title>
                                <Card.Title> <h3>Amount to be paid : {props.details.billAmount} /-</h3>  </Card.Title>
                                <Button type="button">
                                        Print
                                </Button>
                            </Card.Body>
                        </Card>

                    </div>

                </div>
            </center>
        </>
    )
}
export default Bill;