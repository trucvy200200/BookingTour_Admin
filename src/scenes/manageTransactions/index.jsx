import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";


const ManageTransactions = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [{
        field: "paymentId",
        headerName: "Transaction ID",
        flex: 1,
    },
    {
        field: "userId",
        headerName: "User ID",
        flex: 1,
        cellClassName: "name-column--cell",
    },

    {
        field: "tourId",
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
    },
    {
        field: "updatedAt",
        headerName: "Updated At",
        flex: 1,
    },
    ];
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
                    checkboxSelection
                    rows={mockDataInvoices}
                    columns={columns}
                    pageSizeOptions={[5, 10, 15]}>

                </DataGrid>
            </Box>
        </Box >
    );
}
export default ManageTransactions;