import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

import { logout } from '../../firebase/api';
import ProfilePhoto from '../Avator';
import Slideshow from '../Slideshow';
import WelcomeDialog from '../Popup';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {},
  appBar: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: theme.spacing(7) + 1,
    },
    maxWidth: 72,
    boxShadow: 'none',
    backgroundColor: '#d675af',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: '#d675af',

    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: '#d675af',

    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerListItem: {
    color: '#fcf7ff',
    paddingLeft: 12,
    paddingRight: 24,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 8,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  copyright: {
    position: 'absolute',
    fontSize: '0.6rem',
    bottom: 0,
    left: 0,
    color: '#eee',
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const handleOpenWelcome = () => setWelcome(true);
  const handleCloseWelcome = () => setWelcome(false);

  const handleDrawerOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}></div>
        <ProfilePhoto />
        <List></List>
        <List>
          <ListItem button onClick={handleOpenWelcome} key={'ログアウト'} className={classes.drawerListItem}>
            <ListItemIcon className={classes.drawerListItem}>
              <LiveHelpIcon />
            </ListItemIcon>
            <ListItemText primary={'使い方'} />
          </ListItem>
          <ListItem></ListItem>
          <ListItem button onClick={logout} key={'ログアウト'} className={classes.drawerListItem}>
            <ListItemIcon className={classes.drawerListItem}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'ログアウト'} />
          </ListItem>
        </List>
        <div className={classes.copyright}>
          <Typography variant="h8">©2021 Weekly menu!ーー何を食べる？</Typography>
        </div>
      </Drawer>
      <WelcomeDialog
        open={welcome}
        onClose={handleCloseWelcome}
        popupTitle={'ようこそ、Weekly menu!ーー何を食べる？'}
        popupContent={<Slideshow />}
      ></WelcomeDialog>
    </div>
  );
}
