
import { fade, makeStyles } from '@material-ui/core/styles';
import { default as AccountCircle, default as AccountCircleIcon } from '@material-ui/icons/AccountCircle';

import React from 'react';
import { Link, useHistory } from "react-router-dom";

// import { Offline, Online } from "react-detect-offline";

import {
  AppBar,
  Badge,
  Button,
  IconButton,
  InputBase,
  Link as LinkUI,
  Menu, 
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core'

import {
  ArrowBackIos as ArrowBackIosIcon,
  Mail as MailIcon,
  MoreVert as MoreIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon
} from '@material-ui/icons'


function TopMenuBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const searchString = "Nicaragua"
  // const searchString = useSelector((state) => state.searchReducer.searchstring);


  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchFocus = () => {
    if(history.location.pathname !== "/search")
      history.push("/search")    
  };

  const handleUnFocus = () => {
    // console.log("onBlur")
  }

  const handleSearchChange = (searchvalue) => {
      console.log("searchvalue " + searchvalue)
  } 

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

//   .MuiAppBar-colorPrimary {
//     color: #fff;
//     background-color: #3f51b5;
// }

  return (
    <div className={classes.grow}>
      <AppBar position="static" 
      classes={{
        colorPrimary: classes.test, // class name, e.g. `classes-nesting-root-x`
      }}>
        <Toolbar>

          <div className={classes.sectionMobile}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={ () => history.goBack() }
            >
              <ArrowBackIosIcon />
            </IconButton>
          </div>

          <Typography className={classes.title} variant="h6" noWrap>
            {/* <img src={img_src} style={{ width: 45}}/> */}
            <LinkUI component={Link} to="/home" style={{ textDecoration: 'none', color: 'white' }}>
              Impact App
            </LinkUI>
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onBlur={() => handleUnFocus()}
              onFocus={() => handleSearchFocus()}
              onChange={(e) => handleSearchChange(e.target.value)}
              value={searchString}
            />
          </div>
          <div className={classes.grow} />

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}


const useStyles = makeStyles(theme => ({
  test: {
    backgroundColor: '#56A68C'
  },
  grow: {
    flexGrow: 1,
    backgroundColor: '#009688'
    //marginBottom: '50px'
  },
  menuButton: {
    marginRight: 0, // theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      //display: 'block',
      display: 'flex',
      alignItems: 'center',
      width: 200,
      justifyContent: 'space-evenly'
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    alignItems: 'inherit'
  },
  whiteColor: {
    color: 'white'
  },
  buttonPad: {
    padding: '6px',
    fontSize: 'small'
  },
  smallprofileimage: {
    width: '40px',
    height: '40px',
    objectFit: 'cover',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '100px'
  },
  offline: {
    background: theme.palette.primary.main,
    borderRadius: 15,
    padding: 6,
    margin: '0 20px'
  },
  username: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginRight: 15, 
      color: 'rgba(255,255,255,0.9)'
    }
  }
}));

export default TopMenuBar;
