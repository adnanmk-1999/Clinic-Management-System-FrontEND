import Carousel from "../../components/carousel/carousel";
import {useState, useEffect} from 'react';
import axios from 'axios';
import SearchPage from "../../components/search/search";
import Event from "./eventdetails"

function EventsPage(){

  const [events, setEvents] = useState([]);

  useEffect(() => {
      
      axios.get('http://localhost:4000/events') //gets data from api
        .then(response =>{
            console.log('Promise fullfilled'); //if data recieved, output 
            console.log(response);             //display output (responce)
            setEvents(response.data); //save only 'data' in response to the state
        })
  },[]);



    return(
      <>
      <div className="home">
        <center><h2 className="heading">Events and Announcements</h2></center>
   
        <Carousel/>

        <div>
        <div className = "staffCards">
            {events.map(event => 
                    <div key = {event.id}>
                        <Event details = {event}/>
                    </div>
                )}
        </div>
      </div>

          
        <center><h5 className="heading">AUTOMATE HISTORY TAKING & DIAGNOSIS</h5></center>
      
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Morbi sit amet gravida sem, a faucibus tortor. 
          Vivamus eleifend vulputate orci, a iaculis lectus cursus nec. 
          Nulla vulputate eros in leo placerat, ullamcorper vestibulum dui malesuada. 
          ec tempor lacus nec lorem molestie, non tincidunt metus lacinia. Etiam eget nibh elit. 
          Curabitur sed tristique quam. Nulla a hendrerit justo, at bibendum sapien. 
          Integer ac nunc sed ligula porttitor pellentesque vitae sed erat. Vestibulum quis neque nisl. 
          Donec pulvinar sem in venenatis congue. Aliquam at nisi eu augue finibus feugiat. 
          Phasellus volutpat porttitor felis, et dictum dolor facilisis nec. 
          Fusce vulputate ut dui nec egestas. Nullam eu neque quis nibh luctus fringilla. 
          Curabitur egestas tortor quam, sit amet laoreet lectus mollis quis.</p>
      
      </div>
      <SearchPage/>

      </>
    );
  };
  
  export default EventsPage;