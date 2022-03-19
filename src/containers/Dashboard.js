import { Header, NotificationCenter, Sidebar, Workspace } from "../components";
import React, { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

// ======> floating settings button <=======
// import FormatTextdirectionLToRIcon from "@material-ui/icons/FormatTextdirectionLToR";
// import FormatTextdirectionRToLIcon from "@material-ui/icons/FormatTextdirectionRToL";
// import Hidden from "@material-ui/core/Hidden";
// import SettingsIcon from "@material-ui/icons/Settings";
// import SpeedDial from "@material-ui/lab/SpeedDial";
// import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
// import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
// import { useAppState } from "../components/AppProvider/AppProvider";
// import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { MobileBreakpoint } from "../styleVariables";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import routes from "../routes";
import useMountEffect from "../mountEffect";
import Newboard from '../pages/Taskboard/newBoard';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import aiceresoft from '../aiceresoft.png';

const useStyles = makeStyles(theme => ({
  panel: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      minHeight: "calc(100vh - 64px)",
      paddingTop: "64px"
    },
    [theme.breakpoints.down("xs")]: {
      height: "auto",
      minHeight: "calc(100vh - 56px)",
      paddingTop: "56px"
    },
    [theme.breakpoints.up("sm")]: {
      height: "calc(100vh - 64px)"
    },
    display: "flex",
    flexDirection: "row",
    flexGrow: 1
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(1) * 2,
    right: theme.spacing(1) * 3
  }
}));

const Dashboard = ({ history }) => {


  const classes = useStyles();
  // const [state, dispatch] = useAppState();
  const [opened, setOpened] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  // const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [allroutes, setRoutes] = useState(routes.items);

  const mediaMatcher = matchMedia(`(max-width: ${MobileBreakpoint}px)`);

  const resizeDispatch = () => {
    if (typeof Event === "function") {
      window.dispatchEvent(new Event("resize"));
    } else {
      const evt = window.document.createEvent("UIEvents");
      evt.initUIEvent("resize", true, false, window, 0);
      window.dispatchEvent(evt);
    }
  };

  const handleDrawerToggle = () => {
    setOpened(!opened);
    resizeDispatch();
  };

  const handleNotificationToggle = () =>
    setNotificationsOpen(!notificationsOpen);

  // =======> hanhandleFullscreenToggle <==========
  // const handleFullscreenToggle = () => {
  //   const element = document.querySelector("#root");
  //   const isFullscreen =
  //     document.webkitIsFullScreen || document.mozFullScreen || false;

  //   element.requestFullScreen =
  //     element.requestFullScreen ||
  //     element.webkitRequestFullScreen ||
  //     element.mozRequestFullScreen ||
  //     function () {
  //       return false;
  //     };
  //   document.cancelFullScreen =
  //     document.cancelFullScreen ||
  //     document.webkitCancelFullScreen ||
  //     document.mozCancelFullScreen ||
  //     function () {
  //       return false;
  //     };
  //   isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
  // };

  // const handleSpeedDialOpen = () => setOpenSpeedDial(true);

  // const handleSpeedDialClose = () => setOpenSpeedDial(false);

  const addBoard = (title) => {

    if (title.trim().length > 1) {
      let newBoard = {
        path: "/" + title,
        name: title,
        type: 'link',
        icon: NewReleasesIcon,
        component: Newboard
      };
      allroutes.splice(allroutes.length, 0, newBoard);
      setRoutes([...allroutes]);
      history.push('/' + title);
    }
    else {
      console.log("please enter name")
    }

  }

  const getRoutes = (
    <Switch>
      {allroutes.map((item, index) =>
        item.type === "external" ? (
          <Route
            exact
            path={item.path}
            component={item.component}
            name={item.name}
            key={index}
          />
        ) : item.type === "submenu" ? (
          item.children.map(subItem => (
            <Route
              exact
              path={`${item.path}${subItem.path}`}
              component={subItem.component}
              name={subItem.name}
            />
          ))
        ) : (
          <Route
            exact
            path={item.path}
            component={item.component}
            name={item.name}
            key={index}
          />
        )
      )}
      {/* <Redirect to="/404" /> */}
    </Switch>
  );

  useMountEffect(() => {
    if (mediaMatcher.matches) setOpened(false);
    mediaMatcher.addListener(match => {
      setTimeout(() => {
        if (match.matches) setOpened(false);
        else setOpened(true);
      }, 300);
    });

    // const unlisten = history.listen(() => {
    //   if (mediaMatcher.matches) setOpened(false);
    //   document.querySelector("#root > div > main").scrollTop = 0;
    // });

    return () => {
      mediaMatcher.removeListener(match => {
        setTimeout(() => {
          if (match.matches) setOpened(false);
          else setOpened(true);
        }, 300);
      });
    };
  });

  return (
    <>
      <Header
        logoAltText="Primer Admin Template"
        logo={aiceresoft}
        toggleDrawer={handleDrawerToggle}
        toogleNotifications={handleNotificationToggle}
      />
      <div className={classNames(classes.panel, "theme-dark")}>
        <Sidebar
          addBoard={addBoard}
          routes={allroutes}
          opened={opened}
          toggleDrawer={handleDrawerToggle}
        />
        <Workspace opened={opened}>{getRoutes}</Workspace>
        <NotificationCenter
          notificationsOpen={notificationsOpen}
          toogleNotifications={handleNotificationToggle}
        />
      </div>

      {/* <Hidden xsDown>
        <SpeedDial
          ariaLabel="Settings"
          className={classes.speedDial}
          icon={<SpeedDialIcon icon={<SettingsIcon />} />}
          onBlur={handleSpeedDialClose}
          onClose={handleSpeedDialClose}
          onFocus={handleSpeedDialOpen}
          onMouseEnter={handleSpeedDialOpen}
          onMouseLeave={handleSpeedDialClose}
          open={openSpeedDial}
        >
          <SpeedDialAction
            icon={<WbSunnyIcon />}
            tooltipTitle="Toggle light/dark theme"
            onClick={() => dispatch({ type: "type" })}
          />
          <SpeedDialAction
            icon={
              state.direction === "rtl" ? (
                <FormatTextdirectionLToRIcon />
              ) : (
                <FormatTextdirectionRToLIcon />
              )
            }
            tooltipTitle="Toggle LTR/RTL direction"
            onClick={() => dispatch({ type: "direction" })}
          />
        </SpeedDial>
      </Hidden> */}
    </>
  );
};

export default Dashboard;
