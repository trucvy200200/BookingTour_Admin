import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState } from "react";
import Header from "../../components/Header";
import axios from "axios"
import { useEffect } from "react";
import { convertDateTime } from "../../utility/ConvertDate";
import ModalDetail from "./ModalDetail"
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
        case "-1":
            return (
                "Cancel"
            )
    }
}
const ManageTransactions = () => {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [idPayment, setIdPayment] = useState(null)
    const colors = tokens(theme.palette.mode);
    const [detail, setDetail] = useState({});
    useEffect(() => {
        getDetail()
    }, [idPayment])
    const getDetail = () => {
        setDetail(data.find(tour => tour._id === idPayment))
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const columns = [{
        field: "idPayment",
        headerName: "Transaction ID",
        flex: 1,
    },
    {
        field: "idUser",
        headerName: "User ID",
        flex: 1,
        cellClassName: "name-column--cell",
    },

    {
        field: "idTour",
        headerName: "Tour ID",
        flex: 1,
    },
    {
        field: "nChildren",
        headerName: "Children Number",
        flex: 1,
    },
    {
        field: "nAdult",
        headerName: "Adult Number",
        flex: 1,
    },
    {
        field: "totalPrice",
        headerName: "Total Price",
        flex: 1,
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
    },
    {
        field: "updatedAt",
        headerName: "Updated At",
        flex: 1,
        renderCell: ({ row: { updatedAt } }) => {
            return convertDateTime(updatedAt)
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
                        colors.greenAccent[600]
                    }
                    borderRadius="4px"
                >
                    <Button variant="outlined text-white" onClick={() => {
                        handleClickOpen()
                        setIdPayment(params.row._id)
                    }}>
                        Detail
                    </Button>
                </Box >
            )
        }
    },
    ];
    useEffect(() => {
        axios.post("/api/admin/get-all-order-tour").then(res => {
            setData(res.data.tourData.data)
        })
    }, [])
    return (
        <Box m="20px">
            <Header title="MANAGE TRANSACTIONS" subtitle="Managing user's booking" />
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
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]}!important`
                    },

                }} >
                <DataGrid
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    rows={data.length > 0 ? data : []}
                    columns={columns}
                    getRowId={row => row._id}
                    pageSizeOptions={[5, 10, 15]}>

                </DataGrid>
            </Box>
            <ModalDetail open={open} handleClose={handleClose} data={detail} />
        </Box >
    );
}
export default ManageTransactions;