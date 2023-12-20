import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Grid, Box, useTheme } from '@mui/material'
import { DragDrop } from "@uppy/react"
import { tokens } from "../../theme";
import thumbnailGenerator from "@uppy/thumbnail-generator"
import Uppy from "@uppy/core"
import useMediaQuery from "@mui/material/useMediaQuery";

export default function FormDialog({ open, handleClose, handleOk }) {
    const [isChoose, setIsChoose] = useState(false)
    const [editData, setEditData] = useState("")
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const renderPreview = () => {
        return (
            <div className="icon_details_header">
                <div className={"add-image__item-container icon-avatar"}>
                    <div className="image-wrapper">
                        {/* {data?.image_url && ( */}
                        <img
                            className={`add-image__item-image`}
                            // src={data?.image_url && data?.image_url.includes("http") ? data?.image_url : ""}
                            alt="icon picture"
                        />
                        {/* )} */}
                    </div>
                    <div className="actions-wrapper">
                        <div className="buttons">
                            <div className={"icon-upload-image"}>
                                Upload
                                <div className="uppy-wrapper">
                                    <DragDrop uppy={uppy} />
                                </div>
                            </div>
                        </div>
                        <div className="noti">Allowed JPG, GIF or PNG. Max size of 800K</div>
                    </div>
                </div>
            </div>
        )
    }
    const uppy = new Uppy({
        meta: { type: "avatar" },
        autoProceed: true,
        restrictions: { allowedFileTypes: ["image/*"] }
    })

    uppy.use(thumbnailGenerator)
    uppy.on("thumbnail:generated", (file, preview) => {
        // data.avatar_file = file.data
        setEditData({ ...editData, avatar: preview.toString(), urlAvatar: file.data })

        setIsChoose(true)
    })

    const handleReset = () => {
        // data.avatar_file = null
        // setEditData({ ...editData, avatar: "", urlAvatar: "" })
        // setIsChoose(false)
    }
    const handleSave = async () => {
        // const userId = JSON.parse(localStorage.getItem("userDataUser"))._id
        // if (editData?.urlAvatar) {
        //     const formData = new FormData()
        //     formData.append("id", userId)
        //     formData.append("image", editData?.urlAvatar)
        //     const result = await axios.post("/api/upload-avatar", formData, configHeader)

        //     if (result?.data?.message) {
        //         dispatch(getUserInfoById(userId), () => navigate("/unauthorized"))
        //         toast.success(<SuccessNotificationToast message={result?.data?.message} />)
        //         setIsChoose(false)
        //     }
        // }
    }
    return (
        <React.Fragment >
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ backgroundColor: `${colors.primary[400]} !important`, fontSize: "20px", }}>UPDATE TOUR</DialogTitle>
                <DialogContent sx={{ backgroundColor: `${colors.primary[400]} !important` }}>
                    {renderPreview()}

                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4,minmax(0,1fr)"
                        sx={{
                            "& > div":
                                { gridColumn: isNonMobile ? undefined : "span 4" },
                        }} >
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            fullWidth
                            label="Tour Name"
                            variant="filled"
                            sx={{ gridColumn: "span 4" }}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="duration"
                            label="Tour duration"
                            type="number"
                            fullWidth
                            variant="filled"
                            sx={{ gridColumn: "span 4" }}
                        />

                        <TextField
                            autoFocus
                            id="from"
                            label="From location"
                            fullWidth
                            variant="filled"
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            autoFocus
                            id="to"
                            label="To location"
                            fullWidth
                            variant="filled"
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="destination"
                            label="Destination"
                            fullWidth
                            variant="filled"
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="childPrice"
                            label="Children price"
                            fullWidth
                            variant="filled"
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="adultPrice"
                            label="Adult price"
                            fullWidth
                            variant="filled"
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            label="Description"
                            multiline
                            rows={3}
                            fullWidth
                            variant="filled"
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: `${colors.primary[400]} !important` }}>
                    <Button onClick={handleClose} sx={{ color: "white" }}>Cancel</Button>
                    <Button onClick={handleOk} sx={{ color: "white" }}>Update</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}