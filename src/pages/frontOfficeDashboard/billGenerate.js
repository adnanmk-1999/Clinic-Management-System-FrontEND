import {useState} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import roleController from '../../helpers/roleLogin/roleLogin';

function BillGenerate(){

    if(!roleController.isFrontoffice()){
        window.location = '/login'
      }

    const { patientId } = useParams()
    return (
        <>
       <center> <h1>Generate Bill</h1></center>
        <MyForm  patientId={patientId}/>
        </>
    );
}

function MyForm(props){
    const [inputs, setInputs] = useState({});

    useEffect(() => {

        axios.get(`http://localhost:4000/patients/${props.patientId}`)
            .then(response => {
                console.log('Promise fullfilled');
                console.log(response);

                setInputs(response.data)
            })
    }, [props.patientId])


    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name] : value}))
    };

    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs);

        axios.put(`http://localhost:4000/bills`, inputs)
            .then(response => { 
               // localStorage.setItem('mytoken', response.data.accessToken)  
               setInputs(response.data);
              
            })

            axios.post(`http://localhost:4000/bills`,inputs)
            .then(response=>{
                setInputs(response.data);
                alert(' bill generated successfully');
                window.location='/patientDisplay';
            })
           /*  .catch(error =>{
                localStorage.clear();
                if(error.response){
                    alert(error.response.data)  //=> response payload
                }
            }) */
    };

    function goToHome(){
        window.location = '/patientDisplay';
    }

    return(
        <>
        <div className="form">


        <Form.Group className="mb-3" controlId="formBasicNumber">
            <input className="input" type = "hidden" name = "patientId" placeholder = "Enter patient id"
                        value = {inputs.patientId|| ''} onChange = {handleChange} 
                        required></input>
            </Form.Group>

            
        <Form onSubmit = {handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Full Name</Form.Label>
                <input className="input" type = "text" name = "patientName" placeholder = "Enter full name"
                        value = {inputs.patientName || ''} onChange = {handleChange} 
                        required></input>
            </Form.Group>

           

           
           

           

            <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Amount  </Form.Label>
            <input className="input" type = "number" name = "billAmount" placeholder = "Enter bill amount"
                        value = {inputs.billAmount|| ''} onChange = {handleChange} min = {0}
                        
                        required></input>
            </Form.Group>

            

            <center>
            <Button variant="primary" type="submit">Generate Bill</Button>&nbsp;&nbsp;
            <Button variant="danger" onClick = {goToHome} >Cancel</Button>
            </center>

        </Form>

        </div>
        </>
    );

};
export default BillGenerate;