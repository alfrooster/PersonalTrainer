import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { NativeSelect } from "@mui/material";

export default function AddCustomer(props) {  
    //komponenttiin tila, jolla saadaan kontrolloitua
    //dialogi toimii ikkunana ja aukea modaalisesti 
    const [open, setOpen] = useState(false);

    const [customer, setCustomer] = useState({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    });
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleInputChange = (event) => {
      setCustomer({ ...customer, [event.target.name]: event.target.value });
      console.log("inputchange: " + JSON.stringify(event.target.value));
    };
  
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
      handleClose();
    };
  
    return (
    <div>
        <Button
            style={{ margin: 10 }}
            variant="outlined"
            onClick={handleClickOpen}
        >
            Add customer
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