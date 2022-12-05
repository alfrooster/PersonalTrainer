import Customers from './Customers';
import Trainings from './Trainings';
import { Typography, Toolbar, AppBar } from '@mui/material';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import { useState } from 'react';
import "./App.css";
import Calendar from './Calendar';

function App() {
  const [value, setValue] = useState('one');
  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Personal Trainer</Typography>
        </Toolbar>
      </AppBar>
      {/*Tabs that render different components*/}
      <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Customers" />
          <Tab value="two" label="Trainings" />
          <Tab value="three" label="Calendar" />
      </Tabs>
      {value === 'one' && <div><Customers/></div>}
      {value === 'two' && <div><Trainings /></div>}
      {value === 'three' && <div><Calendar /></div>}
      
    </div>
  );
}

export default App;
