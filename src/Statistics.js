import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import groupBy from 'lodash/groupBy';
import sumBy from 'lodash/sumBy';

export default function Statistics() {
  //list of trainings
  const [trainings, setTrainings] = useState([]);

  //array for data
  const [data, setData] = useState([]);

  //grouped trainings
  const [groups, setGroups] = useState({});

  //groupnames
  const [groupNames, setGroupNames] = useState([]);

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

  useEffect(() => {
    console.log("in 2nd useeffect function");
    console.log(trainings);
    trainingData();;
  }, [trainings]); //run useeffect, when trainings state is changed

  useEffect(() => {
    console.log("in 3rd useeffect function");
    setData(groupNames.map(training => ( //make an array that will be read by bar chart
        {
        name: training,
        sum: sumBy(groups[training], 'duration') //get the sum of all durations of a training
        }
    )));
    console.log(groups);
    console.log(groupNames);
    console.log(data);
  }, [groups, groupNames]); //run useeffect, when groups or groupNames state is changed

  const trainingData = () => {
    //split trainings in groups
    setGroups(groupBy( trainings, "activity" )); //groupBy makes an object, we need array for mapping
    setGroupNames(Object.keys(groups)); //names of the groups in an array, so we can map them
  }

  return (
    <div>
        <BarChart width={900} height={480} data={data}>
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Duration (minutes)', angle: -90, position: 'insideLeft' }} />
            <Bar dataKey="sum" fill="#1976d2" />
        </BarChart>
    </div>
  );

}