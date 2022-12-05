import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddCustomer(props) {  
    //dialog setOpen false or true
    const [open, setOpen] = useState(false);

    //customer with empty information
    const [customer, setCustomer] = useState({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
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
      setCustomer({ ...customer, [event.target.name]: event.target.value });
      console.log("inputchange: " + JSON.stringify(event.target.value));
    };
  
    //saving the customer and emptying const customer
    const addCustomer = () => {
      props.saveCustomer(customer);
      setCustomer({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
      })
      handleClose(); //close the dialog
    };
  
    return (
    <div>
        <Button
            style={{ margin: 10 }}
            variant="contained"
            onClick={handleClickOpen}
            id="addbutton"
        >
            Add
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add a new customer</DialogTitle>
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
                <Button onClick={addCustomer}>Save customer</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
  }