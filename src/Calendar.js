import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function CalendarPage() {
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

  function firstname(param) {
    if (param != null) { //check if the customer is null, then return either name or nothing
      return param.firstname;
    } else {
      return "";
    }
  }

  function lastname(param) {
    if (param != null) { //check if the customer is null, then return either name or nothing
      return param.lastname;
    } else {
      return "";
    }
  }

  //create calendar events from trainings
  events = trainings.map(training => (
    {
      start: new Date(Date.parse(training.date)),
      end: moment(training.date).add(training.duration, 'm').toDate(), //to get enddate, add training duration as minutes to startdate
      title: training.activity + " with " + firstname(training.customer) + " " + lastname(training.customer)
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