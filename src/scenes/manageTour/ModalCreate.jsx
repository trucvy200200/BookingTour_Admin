import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, useTheme, FormHelperText, FormControl, MenuItem } from '@mui/material'
import { DragDrop } from "@uppy/react"
import { tokens } from "../../theme";
import thumbnailGenerator from "@uppy/thumbnail-generator"
import Uppy from "@uppy/core"
import useMediaQuery from "@mui/material/useMediaQuery";
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from "axios"
import { Form } from 'reactstrap';
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import { configHeader } from '../../@core/plugin/configHeader'
import { isObjEmpty } from "../../utility/Utils"
import { convertDateMonthFirst } from '../../utility/ConvertDate';
export default function FormDialog({ open, handleClose, handleOk, getAllTours }) {
    const [isChoose, setIsChoose] = useState(false)
    const [data, setData] = useState({})
    const [editData, setEditData] = useState("")
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const schema = yup.object().shape({
        name: yup.string().required(),
        duration: yup.number().min(1).required(),
        from: yup.string().required(),
        to: yup.string().required(),
        destination: yup.string().required(),
        childPrice: yup.number().min(1).required(),
        adultPrice: yup.number().min(1).required(),
        description: yup.string().required(),
        openTime: yup.date().min(new Date()).required(),
        closeTime: yup.date().min(new Date()).required(),
        region: yup.string().required()
    })
    const defaultValues = {
        name: "",
        duration: 1,
        from: "",
        to: "",
        destination: "",
        childPrice: 0,
        adultPrice: 0,
        description: "",
        openTime: new Date,
        closeTime: new Date,
        region: ""
    }
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })
    const handleSave = async () => {
        const userId = JSON.parse(localStorage.getItem("userDataUser"))._id
        if (editData?.urlAvatar) {
            const formData = new FormData()
            formData.append("id", userId)
            formData.append("image", editData?.urlAvatar)
            const result = await axios.post("/api/upload-avatar", formData, configHeader)

            if (result?.data?.message) {
                toast.success(result?.data?.message)
                setIsChoose(false)
            }
        }
    }

    const onSubmit = e => {
        if (isObjEmpty(errors)) {
            const data = {}
            data.name = e.name
            data.duration = e.duration
            data.pickUp = e.from
            data.districtDes = e.to
            data.destination = e.destination
            data.childPrice = e.childPrice
            data.adultPrice = e.adultPrice
            data.description = e.description
            data.region = e.region
            data.durationType = e.duration === 1 ? "single" : "multiple"
            data.openTime = convertDateMonthFirst(e.openTime)
            data.closeTime = convertDateMonthFirst(e.closeTime)
            axios.post("/api/add-new-tour", data, configHeader)
                .then(res => {
                    toast.success("Create tour successfully!")
                    getAllTours()
                })
                .catch(err => {
                    if (err.response.data.message) {
                        toast.error(err.response.data.message)
                    } else {
                        toast.error("Something's wrong with one or more field!")
                    }
                })
        }
    }
    return (
        <React.Fragment >
            <Dialog open={open} onClose={handleClose} >
                <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle sx={{ backgroundColor: `${colors.primary[400]} !important`, fontSize: "20px", }}>CREATE TOUR</DialogTitle>
                    <DialogContent sx={{ backgroundColor: `${colors.primary[400]} !important` }}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4,minmax(0,1fr)"
                            sx={{
                                "& > div":
                                    { gridColumn: isNonMobile ? undefined : "span 4" },
                            }} >
                            <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                                <Controller
                                    name='name'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            fullWidth
                                            id="name"
                                            label="Tour Name"
                                            variant="filled"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.name && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                                <Controller
                                    name='duration'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            label="Tour duration"
                                            type="number"
                                            fullWidth
                                            variant="filled"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />

                                    )}
                                />
                                {errors.duration && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.duration.message}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                                <Controller
                                    name='region'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            label="Region"
                                            select
                                            fullWidth
                                            variant="filled"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        >
                                            <MenuItem value={"Central Vietnam"}>
                                                Central Vietnam
                                            </MenuItem>
                                            <MenuItem value={"Southern Vietnam"}>
                                                Southern Vietnam
                                            </MenuItem>
                                            <MenuItem value={"Northern Vietnam"}>
                                                Northern Vietnam
                                            </MenuItem>
                                        </TextField>
                                    )}
                                />
                                {errors.region && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.region.message}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl sx={{ gridColumn: "span 2" }}>
                                <Controller
                                    name='from'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            id="from"
                                            label="From location"
                                            fullWidth
                                            variant="filled"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.from && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.from.message}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl sx={{ gridColumn: "span 2" }}>
                                <Controller
                                    name='to'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            id="to"
                                            label="To location"
                                            fullWidth
                                            variant="filled"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.to && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.to.message}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                                <Controller
                                    name='destination'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="destination"
                                            label="Destination"
                                            fullWidth
                                            variant="filled"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.destination && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.destination.message}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                                <Controller
                                    name='childPrice'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="childPrice"
                                            type='number'
                                            label="Children price"
                                            fullWidth
                                            variant="filled"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.childPrice && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.childPrice.message}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                                <Controller
                                    name='adultPrice'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="adultPrice"
                                            type='number'
                                            label="Adult price"
                                            fullWidth
                                            variant="filled"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.adultPrice && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.adultPrice.message}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                                <Controller
                                    name='openTime'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="openTime"
                                            label="Open time"
                                            fullWidth
                                            variant="filled"
                                            type="date"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.openTime && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.openTime.message}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                                <Controller
                                    name='closeTime'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="closeTime"
                                            label="Close time"
                                            fullWidth
                                            variant="filled"
                                            type="date"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.closeTime && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.closeTime.message}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                                <Controller
                                    name='description'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="description"
                                            label="Description"
                                            multiline
                                            rows={3}
                                            fullWidth
                                            variant="filled"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.description && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>
                                )}
                            </FormControl>
                        </Box>

                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: `${colors.primary[400]} !important` }}>
                        <Button onClick={handleClose} sx={{ color: "white" }}>Cancel</Button>
                        <Button type='submit' sx={{ color: "white" }}>Create</Button>
                    </DialogActions>
                </Form>
            </Dialog>
        </React.Fragment >
    );
}