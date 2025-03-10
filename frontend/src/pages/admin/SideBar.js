import * as React from 'react';
import { Divider } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { SupervisorAccountOutlined, Mail } from '@mui/icons-material';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuMap from '../../components/MenuMap';

const menuItems = [
    { path: "/", label: "Home", icon: <HomeIcon />, exact: true },
    { path: "/Admin/classes", label: "Classes", icon: <ClassOutlinedIcon /> },
    { startsWith: "/Admin/teacher", path: "/Admin/teacher/all", label: "Teachers", icon: <SupervisorAccountOutlined /> },
    { path: "/Admin/subjects", label: "Subjects", icon: <AssignmentIcon /> },
    { startsWith: "/Admin/student", path: "/Admin/student/all", label: "Students", icon: <PersonOutlineIcon /> },
    { path: "/Admin/notices", label: "Notices", icon: <AnnouncementOutlinedIcon /> },
    { path: "/Admin/emails", label: "Emails", icon: <Mail /> },
    { path: "/Admin/profile", label: "Profile", icon: <AccountCircleOutlinedIcon /> },
    { path: "/logout", label: "Logout", icon: <ExitToAppIcon /> },
];

const SideBar = () => {

    return (
        <>
            <MenuMap menuItems={menuItems.slice(0, 7)} />
            <Divider sx={{ my: 1 }} />
            <MenuMap menuItems={menuItems.slice(7)} />
        </>
    )
}

export default SideBar
