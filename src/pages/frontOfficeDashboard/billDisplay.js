import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Bill from "./bill";

//destructuring react to get only useState
function BillDisplay() {

    const [inputs, setInputs] = useState([])

    //Initialize the use state for searching
    const [search, setSearch] = useState('')

    useEffect(() => {
        console.log('the use effect hook has been executed');
        axios.get('http://localhost:4000/bills')
            .then(response => {
                console.log('Promise fullfilled');
                console.log(response);

                setInputs(response.data)
            })
    }, [])

    return (<>

        <center><h1>Bill List</h1></center>

        &nbsp;&nbsp;<input type='search' 
            name='search' placeholder='Search'
            onChange={event =>setSearch(event.target.value)} /><br/><br/>

        {inputs.length === 0 ? (<h3>No Bills Generated !</h3>) : ( 
                <div className = "staffCards">
                    {inputs.filter((bill) => {
                        if (search === ''){
                            return bill
                        }
                        else if (bill.patientName.toLowerCase().includes(search.toLowerCase())){
                        return bill
                        }
                    }).map(bill => 
                        <div key = {bill.id}>
                            <Bill details = {bill}/>
                        </div>
              )}
      </div>
      )}

    </>);
}
export default BillDisplay;