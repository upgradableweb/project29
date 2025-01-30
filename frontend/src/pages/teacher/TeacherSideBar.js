import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { CoPresent } from '@mui/icons-material';

const TeacherSideBar = () => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/" selected={location.pathname === ("/" || "/Teacher/dashboard")}>
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Teacher/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ color: location.pathname === ("/" || "/Teacher/dashboard") ? 'primary' : 'inherit' }}
                        primary="Home" />
                </ListItemButton>
                <ListItemButton selected={location.pathname.startsWith("/Teacher/subjects")} component={Link} to="/Teacher/subjects">
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith("/Teacher/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ color: location.pathname.startsWith("/Teacher/subjects") ? 'primary' : 'inherit' }}
                        primary={`Subjects`} />
                </ListItemButton>
                <ListItemButton selected={location.pathname.startsWith("/Teacher/attendance")} component={Link} to="/Teacher/attendance">
                    <ListItemIcon>
                        <CoPresent color={location.pathname.startsWith("/Teacher/attendance") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ color: location.pathname.startsWith("/Teacher/attendance") ? 'primary' : 'inherit' }}
                        primary={`Attendance`} />
                </ListItemButton>
                {/* <ListItemButton selected={location.pathname.startsWith("/Teacher/complain")} component={Link} to="/Teacher/complain">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Teacher/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ color: location.pathname.startsWith("/Teacher/complain") ? 'primary' : 'inherit' }}
                        primary="Complain" />
                </ListItemButton> */}
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListItemButton selected={location.pathname.startsWith("/Teacher/profile")} component={Link} to="/Teacher/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Teacher/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ color: location.pathname.startsWith("/Teacher/profile") ? 'primary' : 'inherit' }}
                        primary="Profile" />
                </ListItemButton>
                <ListItemButton selected={location.pathname.startsWith("/logout")} component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ color: location.pathname.startsWith("/logout") ? 'primary' : 'inherit' }}
                        primary="Logout" />
                </ListItemButton>
            </React.Fragment>

        </>
    )
}

export default TeacherSideBar