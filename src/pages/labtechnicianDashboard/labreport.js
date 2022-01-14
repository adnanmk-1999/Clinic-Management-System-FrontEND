import { Link } from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import "./labtechnician.css"

function LabReport(props){
    return(
      <>
      <div className = "cardsList">
        <Card className="text">
          <Card.Body>
            <Card.Title><h4>Test Name : {props.details.testName}</h4></Card.Title>
            <div className = "floatright">
            <Button>
              <Link className = "labrepBut" to = {`/reportdetails/${props.details.labReportId}`}>View Details</Link>
            </Button>
            </div>
          </Card.Body>
        </Card>
 

      </div>

      </>
    );
  };

  export default LabReport;