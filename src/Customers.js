import React, { useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { CSVLink } from "react-csv";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Customers () {
    //list of customers
    const [customers, setCustomers] = useState([]);

    //filtered customers for csv
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    const filterCustomers = () => {
        //filter customers for csv
        setFilteredCustomers(customers.map(({content, links, ...rest}) => {
            return rest;
        }));
        console.log(filteredCustomers);
    }

    //fetch customers from rest
    useEffect(() => {
        console.log("in useeffect function");
        fetchCustomers();
        console.log(customers);
    }, []);

    const fetchCustomers = () => {
        //fetch customer info
        fetch("http://customerrest.herokuapp.com/api/customers")
            .then(response => response.json())
            .then(data => setCustomers(data.content))
    }

    //delete a customer
    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure you want to delete customer?') == true) {
            console.log("deleted " + link[0].href);
            fetch(link[0].href , {method: 'DELETE'}) //link to the specific customer
                .then(response => {
                    if(response.ok) {
                        fetchCustomers();
                    }
                }
            )
        }
    }

    //send a POST request to the API to save the customer
    const saveCustomer = (customer) => {
        fetch("http://customerrest.herokuapp.com/api/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        })
          .then((response) => fetchCustomers())
          .catch((err) => console.error(err));
        console.log(JSON.stringify(customer));
    }

    //send a PUT request to the customer's link to edit the customer
    const saveEditedCustomer = (customer, link) => {
        fetch(link[0].href , {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        })
          .then((response) => fetchCustomers())
          .catch((err) => console.error(err));
        console.log(JSON.stringify(customer));
    }

    //create columns, set header names, width etc.
    const [columnDefs, setColumnDefs] = useState([
        {headerName: "First name", field: 'firstname', sortable: true, filter: true, width: 130},
        {headerName: "Last name", field: 'lastname', sortable: true, filter: true, width: 150},
        {headerName: "Street address", field: 'streetaddress', sortable: true, filter: true},
        {headerName: "Post code", field: 'postcode', sortable: true, filter: true, width: 120},
        {field: 'city', sortable: true, filter: true, width: 130},
        {field: 'email', sortable: true, filter: true},
        {headerName: "Phone number", field: 'phone', sortable: true, filter: true, width: 170},
        {
            headerName: '',
            width: 80,
            field: 'links',
            cellRenderer: params => //send the link to the customer as props
            <EditCustomer saveCustomer={saveEditedCustomer} link={params.value}/> //render edit button
        },
        {
            headerName: '',
            width: 80,
            field: 'links',
            cellRenderer: params => //call the onclick delete function with parameter link to customer
            <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
                <DeleteIcon />
            </IconButton> //render delete button
        }
    ]);

    return(
        <>
            <AddCustomer saveCustomer={saveCustomer} />
            <Button onClick={filterCustomers} style={{ margin: 10 }} variant="contained">
                <CSVLink id="csv" data={filteredCustomers}>Download</CSVLink>
            </Button>
            <div className="ag-theme-alpine" style={{height: '470px', width: '100%', margin: 'auto'}}>
                <AgGridReact rowData={customers} columnDefs={columnDefs}
                    animateRows={true} rowSelection='multiple'
                    paginationPageSize={10} pagination={true} rowHeight={47} />
            </div>
        </>
    )
}

export default Customers;