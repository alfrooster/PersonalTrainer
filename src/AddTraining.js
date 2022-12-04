import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { NativeSelect } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function AddTraining(props) {  
    //dialog setOpen false or true
    const [open, setOpen] = useState(false);

    //get a list of customers
    const [customers, setCustomers] = useState([]);

    //datepicker value
    const [value, setValue] = useState(null);

    //training with empty information
    const [training, setTraining] = useState({
      date: "",
      duration: "",
      activity: "",
      customer: ""
    });
  
    //opening a dialog
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    //closing a dialog
    const handleClose = () => {
      setOpen(false);
    };
  
    //when input changes, set attribute as the inputted value
    const handleInputChange = (event) => {
      setTraining({ ...training, [event.target.name]: event.target.value });
      console.log("inputchange: " + JSON.stringify(event.target.value));
    };

    //when customer is selected, set customer as the selected value
    const handleCustomerChange = (event) => {
      let customer = "https://customerrest.herokuapp.com/api/customers/" + event.target.value; //id from the selected option to the end of the link
      setTraining({ ...training, customer: customer });
      console.log("customerchange: " + customer);
    };
  
    //saving the training and emptying const training
    const addTraining = () => {
      props.saveTraining(training);
      setTraining({
        date: "",
        duration: "",
        activity: "",
        customer: ""
      })
      setValue(null); //set datepicker value to null
      handleClose(); //close the dialog
    };

    //fetch a list of customers, so that a customer can be selected from dropdown
    const fetchCustomers = () => {
      fetch("http://customerrest.herokuapp.com/getcustomers")
        .then(response => response.json())
        .then(data => setCustomers(data))
    }

    useEffect(() => {
      console.log("in useeffect function");
      fetchCustomers();
      console.log(customers);
    }, []);

    //user chooses day and time from date picker, set it as date in obj training
    const dateAdd = (newValue) => {
      setTraining({...training, date: newValue});
      console.log(training.date);
      setValue(newValue);
    }
  
    return (
    <div>
        <Button
            style={{ margin: 10 }}
            variant="contained"
            onClick={handleClickOpen}
        >
            Add
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add a new training</DialogTitle>
            <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Date and time"
                    value={value}
                    name="date"
                    onChange={dateAdd}
                    renderInput={(params) => <TextField margin="dense" {...params} />}
                    ampm={false}
                /> {/*ampm = false so no AM and PM but 24 hour clock */}
            </LocalizationProvider> 
            <TextField
                margin="dense"
                name="duration"
                value={training.duration}
                label="Duration (in minutes)"
                fullWidth
                onChange={e => handleInputChange(e)}
            />
            <TextField
                margin="dense"
                name="activity"
                value={training.activity}
                label="Activity"
                fullWidth
                onChange={e => handleInputChange(e)}
            />
            <NativeSelect
              onChange={e => handleCustomerChange(e)}
              name="customer">
              <option value="" selected disabled hidden>Select customer</option>
              {/*Each customer from the fetched list as an option inside select*/}
              {customers.map(customer => (
                  <option value={customer.id}>{customer.id} {customer.firstname} {customer.lastname}</option>
              ) )}
            </NativeSelect>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addTraining}>Save training</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
  }