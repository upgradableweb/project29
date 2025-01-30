import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip, Tabs, Tab, CircularProgress, Button, Paper } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Add } from '@mui/icons-material';
import styled from 'styled-components';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import Semisters from './Semisters';
import TableViewTemplate from '../../../components/TableViewTemplate';
import BranchTable from './BranchTable';

const ShowClasses = () => {

  const [tab, setTab] = useState('Branch')
  const navigate = useNavigate()


  const actions = [
    {
      icon: <Add color="primary" />, name: 'Add New ' + tab,
      action: () => {
        if (tab == "Branch") {
          navigate("/Admin/classes/branch/new")
        } else {
          document.getElementById('add-semister').click()
        }
      }
    }
  ];




  return (
    <div>
      <Paper sx={{ m: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <Tabs
            value={tab}
            onChange={(e, val) => setTab(val)}
            aria-label="wrapped label tabs example"
          >
            <Tab value="Branch" label="All Branches" />
            <Tab value="Semister" label="All Semisters" />
          </Tabs>
          <SpeedDialTemplate actions={actions} />
        </Box>
        <br />
        {tab == "Semister" ?
          <Semisters />
          : <BranchTable />}
      </Paper>
      <br />
      <br />
      <br />
    </div>
  );
};

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  }
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;