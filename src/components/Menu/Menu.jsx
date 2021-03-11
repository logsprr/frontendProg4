import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

export default function MenuOptions() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  const handleClose = (local) => {
    history.push(local);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    } else {
      handleClose('/login');
    }
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      >
        <img alt="pic" src="https://static.thenounproject.com/png/630740-200.png" style={{ width: 50, height: 50, borderRadius: 25 }} />
      </Button>
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
