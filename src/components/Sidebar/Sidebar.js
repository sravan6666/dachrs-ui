import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import SidebarItem from './SidebarItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { drawerWidth } from '../../styleVariables';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';


import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    maxWidth: drawerWidth,
    height: '100%',
    zIndex: theme.zIndex.drawer + 99
  },
  modal: {
    [theme.breakpoints.down('sm')]: {
      top: '56px!important'
    },
    [theme.breakpoints.up('sm')]: {
      top: '64px!important'
    },
    zIndex: '1000!important'
  },
  backdrop: {
    [theme.breakpoints.down('sm')]: {
      top: '56px'
    },
    [theme.breakpoints.up('sm')]: {
      top: '64px'
    }
  }
}));

const Sidebar = ({ opened, toggleDrawer, routes, location, addBoard }) => {
  let history = useHistory();

  const classes = useStyles();
  const [activeRoute, setActiveRoute] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const newBoard = {
    path: '/createBoard',
    name: 'New Board',
    type: 'link',
    icon: AddIcon,
    component: null
  }

  const toggleMenu = index =>
    setActiveRoute(activeRoute === index ? undefined : index);

  const menu = (
    <List component="div">
      {routes.map((route, index) => {
        const isCurrentPath =
          location.pathname.indexOf(route.path) > -1 ? true : false;
        return (
          <SidebarItem
            key={index}
            index={index}
            route={route}
            activeRoute={activeRoute}
            toggleMenu={toggleMenu}
            currentPath={isCurrentPath}
          />
        );
      })}
      <div onClick={() => setOpen(true)}>
        <SidebarItem
          key="new board"
          index="new board"
          route={newBoard}
          activeRoute={activeRoute}
          toggleMenu={toggleMenu}
          currentPath={location.pathname.indexOf('/createBoard') > -1 ? true : false}
        />
      </div>
    </List>
  );


  return (
    <>
      <Hidden smDown>
        <Drawer
          variant="persistent"
          classes={{
            paper: classes.drawerPaper
          }}
          open={opened}
          ModalProps={{
            keepMounted: false,
            className: classes.modal,
            BackdropProps: {
              className: classes.backdrop
            },
            onBackdropClick: toggleDrawer
          }}
        >
          {menu}
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <SwipeableDrawer
          variant="temporary"
          classes={{
            paper: classes.drawerPaper
          }}
          open={opened}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
          disableBackdropTransition={!iOS}
          ModalProps={{
            keepMounted: false,
            className: classes.modal,
            BackdropProps: {
              className: classes.backdrop
            },
            onBackdropClick: toggleDrawer
          }}
        >
          {menu}
        </SwipeableDrawer>
      </Hidden>
      <Dialog
        open={open}
        onClose={() => { setOpen(false); history.goBack() }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          addBoard(title);
          setTitle("");
          setOpen(false);
        }
        }>
          <DialogTitle id="alert-dialog-title">Task Board</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

              <TextField
                margin="normal"
                required
                id="filled-required"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                fullWidth
              />

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button type="button" className="btn__cancel" onClick={() => { setOpen(false); history.goBack() }}>
              Cancel
            </button>
            <button type="submit" className="btn__update" autoFocus>
              Add
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

Sidebar.prototypes = {
  opened: PropTypes.func,
  toggleDrawer: PropTypes.func,
  closeDrawer: PropTypes.func,
  openDrawer: PropTypes.func,
  routes: PropTypes.object
};

const SidebarWithRouter = withRouter(Sidebar);

export default withWidth()(SidebarWithRouter);
