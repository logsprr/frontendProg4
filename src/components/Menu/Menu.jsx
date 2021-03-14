import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { clearUser } from '../../store/actions/User'

import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function MenuOptions() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => ({
    user: state.user.data,
  }));

  const handleClose = (local) => {
    if(local === "/"){
      dispatch(clearUser())
    }
    setAnchorEl(null);
    history.push(local);
  };

  const handleClick = (event) => {
    console.log(user);
    if (user.id) {
      setAnchorEl(event.currentTarget);
    } else {
      handleClose('/login');
    }
  };

  const getNameInitials = () => {
    return user.name?.split(" ").reduce((a, v) => {return a + v.slice(0,1)}, "") || "SN"
  }

  return (
    <div>
      <Avatar
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ marginLeft: '1rem', width: 50, height: 50, cursor: "pointer" }}
      >
        {getNameInitials()}
      </Avatar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose('/new-product')}>Cadastrar Produtos</MenuItem>
        <MenuItem onClick={() => handleClose('/my-sells')}>Visualizar Vendas</MenuItem>
        <MenuItem onClick={() => handleClose('/')}>Sair</MenuItem>
      </Menu>
    </div>
  );
}
