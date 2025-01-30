import { Link, useLocation } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import React from "react";

const MenuMap = ({ menuItems }) => {
    const location = useLocation();

    return menuItems.map(({ path, label, icon, exact, startsWith }) => {
        const active =  exact ? location.pathname === path : location.pathname.toLowerCase().startsWith(startsWith?.toLowerCase() || path.toLowerCase())

        return (
            <ListItemButton
                key={path}
                selected={active}
                component={Link}
                to={path}
            >
                <ListItemIcon>
                    {React.cloneElement(icon, {
                        color: active ? "primary" : "",
                    })}
                </ListItemIcon>
                <ListItemText
                    primaryTypographyProps={{
                        color: active ? "primary" : "",
                    }}
                    primary={label}
                />
            </ListItemButton>
        )
    })
}

export default MenuMap