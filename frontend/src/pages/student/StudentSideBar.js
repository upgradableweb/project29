import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';

const StudentSideBar = () => {
    const location = useLocation();
    const pathname = location.pathname


    return (
        <>
            <React.Fragment>
                <ListItemButton selected={pathname === ("/" || "/Student/dashboard")} component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon color={pathname === ("/" || "/Student/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ color: pathname === ("/" || "/Student/dashboard") ? 'primary' : 'inherit' }} primary="Home" />
                </ListItemButton>
                <ListItemButton selected={pathname.startsWith("/Student/subjects")} component={Link} to="/Student/subjects">
                    <ListItemIcon>
                        <AssignmentIcon color={pathname.startsWith("/Student/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ color: pathname.startsWith("/Student/subjects") ? 'primary' : 'inherit' }} primary="Subjects" />
                </ListItemButton>
                <ListItemButton selected={pathname.startsWith("/Student/attendance")} component={Link} to="/Student/attendance">
                    <ListItemIcon>
                        <ClassOutlinedIcon color={pathname.startsWith("/Student/attendance") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ color: pathname.startsWith("/Student/attendance") ? 'primary' : 'inherit' }} primary="Attendance" />
                </ListItemButton>
                <ListItemButton selected={pathname.startsWith("/Student/results")} component={Link} to="/Student/results">
                    <ListItemIcon>
                        <StarPurple500Icon color={pathname.startsWith("/Student/results") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ color: pathname.startsWith("/Student/results") ? 'primary' : 'inherit' }} primary="Results" />
                </ListItemButton>
                {/* <ListItemButton selected={pathname.startsWith("/Student/complain")} component={Link} to="/Student/complain">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={pathname.startsWith("/Student/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ color: pathname.startsWith("/Student/complain") ? 'primary' : 'inherit' }} primary="Complain" />
                </ListItemButton> */}
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListItemButton selected={pathname.startsWith("/Student/profile")} component={Link} to="/Student/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={pathname.startsWith("/Student/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ color: pathname.startsWith("/Student/profile") ? 'primary' : 'inherit' }} primary="Profile" />
                </ListItemButton>
                <ListItemButton selected={pathname.startsWith("/logout")} component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon color={pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ color: pathname.startsWith("/logout") ? 'primary' : 'inherit' }} primary="Logout" />
                </ListItemButton>
            </React.Fragment>


        </>
    )
}

export default StudentSideBar