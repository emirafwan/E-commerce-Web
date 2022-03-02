import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useState } from 'react';

const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
        field: 'Fullname',
        headerName: 'Full name',
        width: 250,
        editable: true,
    },
    {
        field: 'Email',
        headerName: 'Email',
        width: 150,
        editable: true,
    },
    {
        field: 'City',
        headerName: 'City',
        width: 150,
        editable: true,
    },
    {
        field: 'Post',
        headerName: 'Post',
        width: 150,
        editable: true,
    },
    {
        field: 'Address',
        headerName: 'Address',
        width: 300,
        editable: true,
    },
];

export default function AddressForm() {
    const [tableData, setTableData] = useState([])

    const fetchAddress = async () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" }, 
        }
    
        const response = await fetch("http://localhost:8000/api/address", requestOptions)
            const data = await response.json()
            
        if (!response.ok) {
            console.log(data.detail);
        } else {
            console.log(data)
        }
        
        setTableData(data.data)
    }

    useEffect(() => {
        fetchAddress()
    }, [])

    return (
        <div style={{ height: 400, width: '78%', marginLeft:400, marginTop:180}}>
        <DataGrid
            getRowId={row => row._id}
            rows={tableData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
        />
        </div>
    );
}

