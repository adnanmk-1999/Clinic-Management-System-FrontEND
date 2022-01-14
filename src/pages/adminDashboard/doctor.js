import { Link } from "react-router-dom";
import {Button, Card} from 'react-bootstrap'
import './admin.css';

function Doctor(props){
    return(
      <>
      <div className = "staffcards">
        <Card className="text">
          <Card.Header> Doctor Name : {props.details.doctorName}</Card.Header>
          <Card.Body>
            <Card.Title> Specialization : {props.details.specialization}</Card.Title>
            <div className="floatright">
            <Button>
            <Link className = "staffDetails" to = {`/doctordetails/${props.details.doctorId}`}>View Details</Link>
            </Button>
            </div>
          </Card.Body>
        </Card>
        <br/>
        <br/>
        </div>
      </>
    );
  };

  export default Doctor;