import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Patient from "./patient";
import "./front.css"
import roleController from "../../helpers/roleLogin/roleLogin";

//destructuring react to get only useState
function PatientDisplay() {

    if (!roleController.isFrontoffice()) {
        window.location = '/login'
    }

    const [inputs, setInputs] = useState([])

    
    //Initialize the use state for searching
    const [search, setSearch] = useState('')

    useEffect(() => {
        console.log('the use effect hook has been executed');
        axios.get('http://localhost:4000/patients')
            .then(response => {
                console.log('Promise fullfilled');
                console.log(response);

                setInputs(response.data)
            })
    }, [])

    return (<>
        <div className="billCards">
            <center><h1>Registered Patient List</h1></center><br />

            &nbsp;&nbsp;<input type='search' 
                name='search' placeholder='Search'
                onChange={event =>setSearch(event.target.value)} /><br/><br/>

            {inputs.length === 0 ? (<h3>No Patients registered !</h3>) : ( 
                <div className = "staffCards">
                {inputs.filter((patient) => {
                    if (search === ''){
                        return patient
                    }
                    else if (patient.patientName.toLowerCase().includes(search.toLowerCase())){
                        return patient
                    }
                }).map(patient => 
                  <div key = {patient.PatientId}>
                      <Patient details = {patient}/>
                  </div>
              )}
      </div>
      )}

            <hr />
        </div>
    </>);
}
export default PatientDisplay;