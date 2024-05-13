import {AppBar, Container, Box, Toolbar, Typography,Menu, IconButton, MenuItem, Button, Avatar } from "@mui/material";
import * as React from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import  MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/TrendingUp';
import { AUTH_REQUIRED_PAGE_ROUTES, PAGES_ROUTES, PROFILE_PAGES_ROUTES } from "../../constants/pages";
import { authService } from "../../api/authService";
import AppRoutes from "../../constants/routes";
import { tokenService } from "../../api/tokenService";


const AppBarMUI =() => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const pages = authService.isUserLogged() ? AUTH_REQUIRED_PAGE_ROUTES : PAGES_ROUTES;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container >
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Inter',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MyApp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((item) => (
                <MenuItem key={item.id} onClick={handleCloseNavMenu} component={NavLink} to={item.route}>
                  <Typography textAlign="center">{item.page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Inter',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MyApp
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((item) => (
              <NavLink key={item.id} to={item.route}>
              <Button
                key={item.id}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {item.page}
              </Button>
              </NavLink>
            ))}
          </Box>

          {authService.isUserLogged() ? <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {PROFILE_PAGES_ROUTES.map((item) => (
                <MenuItem key={item.id} onClick={handleCloseUserMenu} component={Link} to={item.route}>
                  <Typography textAlign="center">{item.page}</Typography>
                </MenuItem>
              ))}
                 <MenuItem onClick={() => {handleCloseUserMenu(), tokenService.removeToken(), navigate(AppRoutes.ABOUT)}}>
                  <Typography>Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
          : <Button color="inherit"  onClick={() => navigate(AppRoutes.AUTH)} > Login</Button> 
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppBarMUI;