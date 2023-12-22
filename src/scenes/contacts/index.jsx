import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import axios from "axios"
import { useEffect, useState } from "react";
const renderStatus = (params) => {
    switch (params) {
        case "1":
            return (
                "Active"
            )
        case "0":
            return (
                "Inactive"
            )
    }
}
const Contacts = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const columns = [{
        field: "_id",
        flex: 1,
        headerName: "ID",
    },
    {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "phoneNumber",
        headerName: "Phone Number",
        flex: 1,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
    },
    {
        field: "address",
        headerName: "Address",
        flex: 1,
        renderCell: ({ row: { address } }) => {
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                {address}
            </Typography>
        }
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        headerAlign: "center",
        renderCell: (params) => {
            return (
                <Box
                    width="60%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent={"center"}
                    backgroundColor={
                        params.row.status === "1"
                            ? colors.greenAccent[600]
                            : colors.redAccent[700]
                    }
                    borderRadius="4px"
                >
                    <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                        {renderStatus(params.row.status)}
                    </Typography>
                </Box >
            )
        }
    }
    ]
    useEffect(() => {
        axios.post("/api/admin/get-all-user").then(res => {
            setData(res.data?.userData?.data)
        })
    }, [])
    return (
        <Box m="20px">
            <Header title="Contacts" subtitle="List of Contacts for future references" />
            <Box m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700]
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    }
                }} >
                <DataGrid
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    rows={data}
                    getRowId={row => row._id}
                    columns={columns}
                    pageSizeOptions={[5, 10, 15]}
                    slots={{ toolbar: GridToolbar }}>

                </DataGrid>
            </Box>
        </Box >
    );
}
export default Contacts;