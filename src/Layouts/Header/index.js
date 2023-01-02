import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import logo from '../../Assets/Images/logo.png';
import Link from '@mui/material/Link';
import './style.css';

const drawerWidth = 240;
const navItems = [
{
    text: 'Admin',
    path: '/'
}, 
{
    text: 'Customer Portal',
    path: '/ourmenu'
}];

function DrawerAppBar(props) {
  const { windows } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
      <img src={logo} alt='logo' width={80}></img>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = windows !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{background: '#fff', color: '#000', py: 0.5, boxShadow:'0px 2px 10px #f1f1f1'}}>
      <Container>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img src={logo} alt='logo' width={80}></img>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 8 }}>
              <ListItem className= 'active' sx={{ color: '#000', textTransform: 'none', letterSpacing: 1.5, px: 0 }}>
                Orders
              </ListItem>
              <ListItem sx={{ color: '#000', textTransform: 'none', letterSpacing: 1.5, px: 0, whiteSpace: 'nowrap' }}>
              <Link href="https://cloudline.netlify.app/" underline="none" target="_blank">
                Customer Portal
              </Link>
              </ListItem>
          </Box>
        </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default DrawerAppBar;