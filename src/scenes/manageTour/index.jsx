import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios"
import { useEffect, useState } from "react";
import { convertDate } from "../../utility/ConvertDate";
import ModalEdit from "./ModalEdit"
import ModalCreate from "./ModalCreate"
import "./styles.scss"
const renderStatus = (params) => {
    switch (params) {
        case 1:
            return (
                "Active"
            )
        case 0:
            return (
                "Inactive"
            )
    }
}
const ManageTour = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([])
    const [openCreate, setOpenCreate] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseCreate = () => {
        setOpenCreate(false);
    };
    const columns = [{
        field: "_id",
        headerName: "ID",
    },
    {
        field: "name",
        headerName: "Tour Name",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "openTime",
        headerName: "Open time",
        type: "number",
        headerAlign: "left",
        align: "left",
        valueGetter: (params) => {
            return convertDate(params.value);
        },
    },
    {
        field: "closeTime",
        headerName: "Close time",
        flex: 1,
        valueGetter: (params) => {
            return convertDate(params.value);
        },
    },
    {
        field: "region",
        headerName: "Region",
        flex: 1,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        width: 200,
        align: "left",
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
                        params.row.status === 1
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
    },
    {
        field: "",
        headerName: "Actions",
        flex: 1,
        width: 200,
        align: "left",
        headerAlign: "center",
        renderCell: (params) => {
            return (
                <Box
                    m="0 auto"
                    backgroundColor={
                        params.row.status === 1
                            ? colors.greenAccent[600]
                            : colors.redAccent[700]
                    }
                    borderRadius="4px"
                >
                    <Button variant="outlined text-white" onClick={handleClickOpen}>
                        Update
                    </Button>
                </Box >
            )
        }
    },
    ];
    useEffect(() => {
        axios.post("/api/get-all-tours").then(res => {
            setData(res.data?.tourData?.data)
        })
    }, [])
    const handleUpdate = () => {
        axios.post("")
    }
    const handleCreate = () => {

    }
    return (
        <Box m="20px">
            <Header title="MANAGE TOURS" subtitle="Managing the tour list" />
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

                }} >
                <Box mb={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: colors.greenAccent[600],
                            color: colors.grey[100],
                            '&:hover': {
                                backgroundColor: colors.greenAccent[500],
                            }
                        }}
                        onClick={handleClickOpenCreate}>
                        Add new tour
                    </Button>
                </Box>
                <DataGrid
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    rows={data}
                    columns={columns}
                    getRowId={row => row._id}
                    pageSizeOptions={[5, 10, 15]}>

                </DataGrid>
            </Box>
            <ModalEdit open={open} handleClose={handleClose} handleOk={handleUpdate} />
            <ModalCreate open={openCreate} handleClose={handleCloseCreate} handleOk={handleCreate} />
        </Box >
    );
}
export default ManageTour;