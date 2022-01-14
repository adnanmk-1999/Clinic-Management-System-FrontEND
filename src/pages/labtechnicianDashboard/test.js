import { Link } from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import "./labtechnician.css"

function Test(props){
    return(
      <>
      <Card className="text">
          <Card.Body>
            <Card.Title><h4>Test Name : {props.details.testName}</h4></Card.Title>
            <div className = "floatright">
            <Button>
            <Link className = "labrepBut" to = {`/testdetails/${props.details.testId}`}>View Details</Link>
            </Button>
            </div>
          </Card.Body>
        </Card>
       <br/>

      </>
    );
  };

  export default Test;