import React, { useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Trainings () {
    //list of trainings
    const [trainings, setTrainings] = useState([]);

    //fetch trainings from rest
    useEffect(() => {
        console.log("in useeffect function");
        fetchTrainings();
        console.log(trainings);
    }, []);

    const fetchTrainings = () => {
        //fetch training info
        fetch("http://customerrest.herokuapp.com/gettrainings")
            .then(response => response.json())
            .then(data => setTrainings(data))
    }

    //format date in ag-grid
    const dateFormatter = (params) => {
        console.log(params.value);
        if (params.value != "") {
            return dayjs(params.value).format('D.M.YYYY [at] H.mm');
        }
    }

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure you want to delete training?') == true) {
            console.log("deleted " + id);
            fetch("http://customerrest.herokuapp.com/api/trainings/" + id , {method: 'DELETE'})
                .then(response => {
                    if(response.ok) {
                        fetchTrainings();
                    }
                }
            )
        }
    }
    const saveTraining = (trainings) => {
        fetch("http://customerrest.herokuapp.com/api/trainings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trainings),
        })
          .then((response) => fetchTrainings())
          .catch((err) => console.error(err));
        console.log(JSON.stringify(trainings));
    }
    const [columnDefs, setColumnDefs] = useState([
        {field: 'date', sortable: true, filter: true, valueFormatter: dateFormatter},
        {field: 'duration', sortable: true, filter: true, width: 150},
        {field: 'activity', sortable: true, filter: true},
        {headerName: 'Customer', field: 'customer.firstname', sortable: true, filter: true, width: 130},
        {headerName: '', field: 'customer.lastname', sortable: true, filter: true, width: 150},
        {
            headerName: '',
            width: 80,
            field: 'id',
            cellRenderer: params =>
            <IconButton color="error" onClick={() => deleteTraining(params.value)}>
                <DeleteIcon />
            </IconButton>
        }
    ]);

    return(
        <>
            {/*<AddTraining saveTraining={saveTraining} />*/}
            <div className="ag-theme-alpine" style={{height: '470px', width: '100%', margin: 'auto'}}>
                <AgGridReact rowData={trainings} columnDefs={columnDefs}
                    animateRows={true} rowSelection='multiple'
                    paginationPageSize={10} pagination={true} />
            </div>
        </>
    )
}

export default Trainings;