import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Appointment from "./appointment";
import roleController from "../../helpers/roleLogin/roleLogin";


//destructuring react to get only useState
function AppointmentDisplay() {

    if(!roleController.isFrontoffice()){
        window.location = '/login'
      }

    const [inputs, setInputs] = useState([])

    //Initialize the use state for searching
    const [search, setSearch] = useState('')

    useEffect(() => {
        console.log('the use effect hook has been executed');
        axios.get('http://localhost:4000/appointments')
            .then(response => {
                console.log('Promise fullfilled');
                console.log(response);

                setInputs(response.data)
            })
    }, [])

    return (<>
        <div>
            <center><h1>Appointments</h1></center><br/>

            &nbsp;&nbsp;<input type='search' 
                name='search' placeholder='Search'
                onChange={event =>setSearch(event.target.value)} /><br/><br/>

            {inputs.length === 0 ? (<h3>No Appointments !</h3>) : ( 
                <div className = "staffCards">
                    {inputs.filter((appointment) => {
                        if (search === ''){
                            return appointment
                        }
                        else if (appointment.patientName.toLowerCase().includes(search.toLowerCase())){
                        return appointment
                        }
                    }).map(appointment => 
                        <div key = {appointment.id}>
                            <Appointment details = {appointment}/>
                        </div>
              )}
      </div>
      )}

            <hr />
        </div>
    </>);
}
export default AppointmentDisplay;