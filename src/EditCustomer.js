import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

export default function EditCustomer(props) {  
    //dialog setOpen false or true 
    const [open, setOpen] = useState(false);

    //empty customer constant
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    });

    const fetchCustomer = (link) => {
        //fetch customer info
        fetch(link[0].href)
            .then(response => response.json())
            .then(data => setCustomer(data))
        console.log(customer);
    }
  
    //opening a dialog
    const handleClickOpen = () => {
        fetchCustomer(props.link);
        console.log(customer);
        setOpen(true);
    };
  
    //closing a dialog
    const handleClose = () => {
        setOpen(false);
    };
  
    //when input changes, set attribute as the inputted value
    const handleInputChange = (event) => {
      setCustomer({ ...customer, [event.target.name]: event.target.value });
      console.log("inputchange: " + JSON.stringify(event.target.value));
    };
  
    //saving the edited customer
    const editCustomer = () => {
      props.saveCustomer(customer, props.link);
      handleClose();
    };
  
    return (
    <div>
        <IconButton color="primary" onClick={handleClickOpen}>
            <CreateIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit a customer</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                name="firstname"
                value={customer.firstname}
                label="First name"
                fullWidth
                onChange={e => handleInputChange(e)}
            />
            <TextField
                margin="dense"
                name="lastname"
                value={customer.lastname}
                label="Last name"
                fullWidth
                onChange={e => handleInputChange(e)}
            />
            <TextField
                margin="dense"
                name="streetaddress"
                value={customer.streetaddress}
                label="Street address"
                fullWidth
                onChange={e => handleInputChange(e)}
            />
            <TextField
                margin="dense"
                name="postcode"
                value={customer.postcode}
                label="Post code"
                fullWidth
                onChange={e => handleInputChange(e)}
            />
            <TextField
                margin="dense"
                name="city"
                value={customer.city}
                label="City"
                fullWidth
                onChange={e => handleInputChange(e)}
            />
            <TextField
                margin="dense"
                name="email"
                value={customer.email}
                label="Email"
                fullWidth
                onChange={e => handleInputChange(e)}
            />
            <TextField
                margin="dense"
                name="phone"
                value={customer.phone}
                label="Phone"
                fullWidth
                onChange={e => handleInputChange(e)}
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={editCustomer}>Save customer</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
  }