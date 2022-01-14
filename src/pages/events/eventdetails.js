import {Card} from 'react-bootstrap'
import './event.css';

function Event(props){
    return(
      <>
      <div className = "staffcards">
        <Card className="text-center">
          <Card.Header>{props.details.eventName}</Card.Header>
          <Card.Body>
            <Card.Title>{props.details.description}</Card.Title>
            <Card.Text> Date : {props.details.dateOfEvent}</Card.Text>
          </Card.Body>
        </Card>
        <br/>
        <br/>
        </div>
      </>
    );
  };

  export default Event;