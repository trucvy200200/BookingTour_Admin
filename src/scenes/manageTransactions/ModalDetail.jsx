import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, useTheme, FormHelperText, FormControl, MenuItem, Typography } from '@mui/material'
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { convertDateTime } from "../../utility/ConvertDate";

export default function FormDialog({ open, handleClose, data }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    console.log(data)
    return (
        <React.Fragment >
            <Dialog fullWidth open={open} onClose={handleClose} >
                <DialogTitle sx={{ backgroundColor: `${colors.primary[400]} !important`, fontSize: "20px", }}>Payment Detail</DialogTitle>
                <DialogContent sx={{ backgroundColor: `${colors.primary[400]} !important` }}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4,minmax(0,1fr)"
                        sx={{
                            "& > div":
                                { gridColumn: isNonMobile ? undefined : "span 4" },
                        }} >
                        <TextField variant="standard" disabled label="Transaction ID" value={data?.idPayment} />
                        <TextField variant="standard" disabled label="User ID" value={data?.idUser} />
                        <TextField variant="standard" disabled label="Tour ID" value={data?.idTour} />
                        {data?.flight.length > 0 && (
                            <>
                                <TextField fullWidth variant="standard" disabled label="Flight Name" value={data?.flight[0]?.carriers} />
                                <TextField fullWidth variant="standard" disabled label="Flight Price" value={`${data?.flight[0]?.total} VND`} />
                            </>
                        )}
                        {data?.hotel.length > 0 && (
                            <>
                                <TextField variant="standard" disabled label="Hotel Name" value={`${data?.hotel[0]?.name}`} />
                                <TextField variant="standard" disabled label="Flight Name" value={`${data?.hotel[0]?.total} VND`} />
                            </>
                        )}
                        <TextField variant="standard" disabled label="Number of adult" value={`${data?.nAdult}`} />
                        <TextField variant="standard" disabled label="Number of children" value={`${data?.nChildren}`} />
                        <TextField variant="standard" disabled label="Total Price" value={`${data?.totalPrice}`} />
                        <TextField variant="standard" disabled label="Updated At" value={`${data?.updatedAt}`} />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: `${colors.primary[400]} !important` }}>
                    <Button onClick={handleClose} sx={{ color: "white" }}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}