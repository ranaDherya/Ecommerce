import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/actions/user-actions";
import { useNavigate } from "react-router-dom";
import { Dashboard, Person, ExitToApp, ListAlt } from "@mui/icons-material";

import "./Header.css";
import { userActions } from "../../../store/reducers/user-slice";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  const dispatch = useDispatch();
  function logoutUser() {
    dispatch(logout());
    handleCloseUserMenu();
  }

  const userOptions = [
    { name: `Profile`, func: account, icon: <Person /> },
    { name: `Orders`, func: orders, icon: <ListAlt /> },
    { name: `Logout`, func: logoutUser, icon: <ExitToApp /> },
  ];

  if (user.role === "admin") {
    userOptions.unshift({
      icon: <Dashboard />,
      name: `Dashboard`,
      func: dashboard,
    });
  }

  const page1 = [
    { name: "Products", link: "/products" },
    { name: "Contact", link: "/contact" },
    { name: "About", link: "/about" },
    { name: `Cart(${cartItems.length})`, link: "/cart" },
  ];
  const page2 = [
    { name: "Products", link: "/products" },
    { name: "Contact", link: "/contact" },
    { name: "About", link: "/about" },
    { name: "Cart", link: "/cart" },
    { name: "Search", link: "/search" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const navButtonHandler = (link) => {
    navigate(link);
  };
  const [searchInput, setSearchInput] = useState("");

  const searchSubmitHandler = (event) => {
    event.preventDefault();

    if (searchInput.trim()) {
      navigate(`/products/${searchInput}`);
    } else {
      navigate(`/products`);
    }
  };

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <AppBar position="sticky" >
      <Container maxWidth="xl" className="header-container">
        <Toolbar disableGutters>
          <Typography
            className="cursor"
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              backgroundColor: "rgb(25, 118, 210) !important",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={(e) => navButtonHandler("/")}
          >
            Trikuta
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {page2.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={(e) => {
                    navButtonHandler(page.link);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            className="cursor"
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              backgroundColor: "rgb(25, 118, 210) !important",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Trikuta
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {page1.map((page) => (
              <Button
                key={page.name}
                onClick={(e) => {
                  navButtonHandler(page.link);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
            <form className="navSearch" onSubmit={searchSubmitHandler}>
              <input
                type="text"
                placeholder="Search a product..."
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <input type="submit" value="Search" />
            </form>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.name}
                      src={
                        user.avatar.url
                          ? user.avatar.url
                          : "https://res.cloudinary.com/dmnjtpuzu/image/upload/v1686561110/Ecommerce/avatars/default_avatar_ombzaz.png"
                      }
                      style={{ height: "6vh", width: "6vh" }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userOptions.map((option) => (
                    <MenuItem
                      key={option.name}
                      onClick={(e) => {
                        option.func();
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography
                        textAlign="center"
                        display="flex"
                        justifyContent="flex-start"
                        width="100%"
                      >
                        {option.icon}
                        {option.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
            {!isAuthenticated && (
              <Typography
                className="cursor"
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 300,
                  backgroundColor: "rgb(25, 118, 210) !important",
                  color: "inherit",
                  textDecoration: "none",
                }}
                onClick={(e) => {
                  dispatch(userActions.clickedOnLogin());
                  navButtonHandler("/login");
                }}
              >
                Login/SignUp
              </Typography>
            )}
            {!isAuthenticated && (
              <Typography
                className="cursor loginButtonSmallScreen"
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  fontFamily: "monospace",
                  fontWeight: 300,
                  backgroundColor: "rgb(25, 118, 210) !important",
                  color: "inherit",
                  textDecoration: "none",
                }}
                onClick={(e) => {
                  dispatch(userActions.clickedOnLogin());
                  navButtonHandler("/login");
                }}
              >
                Login/SignUp
              </Typography>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
