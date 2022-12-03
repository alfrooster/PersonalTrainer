import React, { useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCustomer from './AddCustomer';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Customers () {
    //list of customers
    const [customers, setCustomers] = useState([]);

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

    const deleteCustomer = (link) => {
        console.log("deleted " + link[0].href);
        fetch(link[0].href , {method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    fetchCustomers();
                }
            })
    }
    const saveCustomer = (customers) => {
        fetch("http://customerrest.herokuapp.com/api/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customers),
        })
          .then((response) => fetchCustomers())
          .catch((err) => console.error(err));
        console.log(JSON.stringify(customers));
    }
    const [columnDefs, setColumnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true, width: 120},
        {field: 'city', sortable: true, filter: true, width: 130},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            width: 80,
            field: 'links',
            cellRenderer: params =>
            <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
                <DeleteIcon />
            </IconButton>
        }
    ]);

    return(
        <>
            <AddCustomer saveCustomer={saveCustomer} />
            <div className="ag-theme-alpine" style={{height: '470px', width: '100%', margin: 'auto'}}>
                <AgGridReact rowData={customers} columnDefs={columnDefs}
                    animateRows={true} rowSelection='multiple'
                    paginationPageSize={10} pagination={true} />
            </div>
        </>
    )
}

export default Customers;