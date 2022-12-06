import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function AddCustomer(props) {
  const localizer = momentLocalizer(moment);

  //list of trainings
  const [trainings, setTrainings] = useState([]);

  let events = [];

  //fetch trainings
  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(data => setTrainings(data))
  }

  useEffect(() => {
    console.log("in useeffect function");
    fetchTrainings();
  }, []);

  //create calendar events from trainings
  events = trainings.map(training => (
    {
      start: new Date(Date.parse(training.date)),
      end: moment(training.date).add(training.duration, 'm').toDate(),
      title: training.activity + " with " + training.customer.firstname + " " + training.customer.lastname
    }
  ));

  console.log(trainings);
  console.log(events);
  
  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
      />
    </div>
  );

}