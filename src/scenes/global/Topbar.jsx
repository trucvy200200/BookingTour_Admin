import { Box, IconButton, useTheme } from '@mui/material';
import { useState } from 'react';
import { useContext } from "react";
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useDispatch } from "react-redux"
import { logout } from "../../redux/actions/auth"
import { useNavigate } from "react-router-dom"
const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const data = JSON.parse(localStorage.getItem("userDataUser"))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const handleLogoutUser = () => {
        dispatch(logout(
            data?._id,
            setLoading,
            () => navigate("/")
        ))
        localStorage.removeItem("userDataUser")
        localStorage.removeItem("accessTokenUser")
    }
    return (
        <Box display="flex" justifyContent={"space-between"} p={2}>
            {/* Search bar */}
            <Box display={"flex"}
                backgroundColor={colors.primary[400]}
                borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            {/*ICONs*/}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode} >
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton >
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton >
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton >
                    <PersonOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleLogoutUser}>
                    Logout
                </IconButton>
            </Box>

        </Box>
    );
}
export default Topbar;

