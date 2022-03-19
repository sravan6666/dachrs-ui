import { infoColor, warningColor } from '../../styleVariables';

import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import EventIcon from '@material-ui/icons/Event';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GroupIcon from '@material-ui/icons/Group';
import HistoryIcon from '@material-ui/icons/History';
import './taskboard.css';

const useStyles = makeStyles(theme => ({

  list: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    whiteSpace: 'normal',
    backgroundColor: 'white',
    borderRadius: "30px"
  },

  task: {
    backgroundColor: "rgba(255,255,255,1)",
    color: "white",
    filter: "blur(0.6)",
    border: "1px solid white",
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[1],
    color: theme.palette.text.primary,
    borderRadius: "10px",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0
    },
    '&:hover': {
      cursor: 'grab'
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      border: '4px solid transparent',
      top: 0,
      borderTopWidth: '12px',
      borderBottomColor: 'transparent',
      right: '6px'
    }
  },
  success: {
    '&::after': {
      borderTopColor: theme.palette.secondary.main,
      borderRightColor: theme.palette.secondary.main,
      borderLeftColor: theme.palette.secondary.main
    }
  },
  info: {
    '&::after': {
      borderTopColor: infoColor,
      borderRightColor: infoColor,
      borderLeftColor: infoColor
    }
  },
  warning: {
    '&::after': {
      borderTopColor: warningColor,
      borderRightColor: warningColor,
      borderLeftColor: warningColor
    }
  },
  morebutton: {
    '&:hover': {
      backgroundColor: "rgba(249, 199, 230,0.7) !important",
      color: "rgba(249, 199, 230,1) lime !important"
    }
  },
  danger: {
    '&::after': {
      borderTopColor: theme.palette.secondary.main,
      borderRightColor: theme.palette.secondary.main,
      borderLeftColor: theme.palette.secondary.main
    }
  },
  cards: {
    position: 'relative',
    padding: `0 ${theme.spacing(1)}px ${theme.spacing(1)}px`,
    boxSizing: 'border-box',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  cardInfo: {
    display: "flex",
    flexDirection: "row",
  }
}));

const TaskItem = ({ task, isDragging, provided, updateTask, index, listId, deleteTask, deleteAttachements }) => {

  const classes = useStyles();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [open, setOpen] = React.useState(false);
  const [importance, setImportance] = React.useState("danger");
  const [priority, setPriority] = React.useState("P5");
  const [enddate, setEndDate] = React.useState(task.endDate);
  const [startdate, setStartDate] = React.useState(task.startDate);
  const [showAttachments, setShowAttachments] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState(task.attachments);
  const [cardDeleteOpen, setCardDeleteOpen] = React.useState(false);
  const [calenderClicked, setCalenderClicked] = React.useState(false);
  const [teamsDialogOpen, setTeamsDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [viewLogs, setViewLogs] = React.useState(false);
  const [color, setColor] = useState(null);

  const colors = [
    "red", "Crimson", "DeepPink", "Fuchsia", "Magenta", "Maroon", "MediumBlue",
    "Tomato", "DarkBlue", "Black"
  ]

  React.useEffect(() => {
    let randomNumber = Math.floor(Math.random() * 10);
    setColor(colors[randomNumber]);
    setTitle(task.title);
    setDescription(task.description);
    setImportance(task.color);
    setPriority(task.priority);

  }, [])

  const handleClickOpen = () => {
    setOpen(true);
    setTitle(task.title);
    setDescription(task.description);
    setStartDate(task.startDate);
    setEndDate(task.endDate);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setCalenderClicked(false);
  };



  return (
    <div
      className={classNames(
        classes.task,
        task.color ? classes[task.color] : ''
      )}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Typography style={{
        color: color,
        backgroundColor: "#f2f9ff",
        borderRadius: "8px",
        width: "fit-content",
        padding: "0px 8px"
      }} variant="subtitle2">{task.title}</Typography>
      <Typography variant="caption">{task.description}</Typography>
      <p style={{ padding: "0px", margin: "0px", width: "100%", height: "1.3px", backgroundColor: "grey" }}></p>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MoreVertIcon
              className={classes.morebutton}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              style={{
                transition: "0.3 ease",
                border: "1.2px solid MediumVioletRed",
                borderRadius: "50%",
                color: "MediumVioletRed",
                backgroundColor: "rgba(249, 199, 230,0.4)",
                fontSize: "18px",
                margin: "5px 3px 0px 0px",
                cursor: "pointer",
                verticalAlign: "middle"
              }}
            />
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => { setAnchorEl(null); handleClickOpen(); }}>
                <EditIcon
                  titleAccess="edit"
                  style={{
                    fontSize: "18px",
                    margin: "4px 8px 0px 0px",
                    cursor: "pointer",
                    verticalAlign: "middle"
                  }} />
                <span>Edit</span>
              </MenuItem>

              <MenuItem onClick={() => { setAnchorEl(null); setCardDeleteOpen(true) }}>
                <DeleteIcon style={{
                  fontSize: "18px",
                  margin: "4px 8px 0px 0px", cursor: "pointer"
                }} />
                <span>delete</span>
              </MenuItem>

              <MenuItem onClick={() => { setAnchorEl(null); setTeamsDialogOpen(true) }}>
                <GroupIcon style={{
                  fontSize: "18px",
                  margin: "4px 8px 0px 0px", cursor: "pointer"
                }} />
                <span>Teams</span>
              </MenuItem>

              <MenuItem onClick={() => { setAnchorEl(null); setCalenderClicked(true); handleClickOpen(); }}>
                <EventIcon
                  style={{
                    fontSize: "18px",
                    margin: "4px 8px 0px 0px",
                    cursor: "pointer",
                    verticalAlign: "middle"
                  }} />
                <span>Calender</span>

              </MenuItem>
              <MenuItem onClick={() => { setAnchorEl(null); setShowAttachments(!showAttachments) }}>
                <i style={{
                  margin: "4px 8px 0px 0px", cursor: "pointer"
                }} className="fas fa-link"></i>
                <span>Attachments</span>
              </MenuItem>

              <MenuItem onClick={() => { setAnchorEl(null); setViewLogs(true) }}>
                <HistoryIcon
                  style={{
                    fontSize: "18px",
                    margin: "4px 8px 0px 0px",
                    cursor: "pointer",
                    verticalAlign: "middle"
                  }} />
                <span>view Logs</span>
              </MenuItem>


            </Menu>

          </div>
          <div>
            <span style={{
              float: "right",
              textAlign: "center",
              verticalAlign: "middle",
              fontSize: "10px",
              height: "16px",
              width: "16px",
              marginTop: "5px",
              fontWeight: "bolder",
              border: "1px solid rgba(255, 222, 255,0.7)",
              backgroundColor: "rgba(255, 222, 255,0.8)",
              color: "dark",
              borderRadius: "50%"
            }}>
              {task.priority}
            </span>




          </div>
        </div>

        <div style={{ display: showAttachments ? "block" : "none", marginTop: "10px" }}>

          {
            selectedFiles.length === 0 && <p style={{ textAlign: "center", padding: "0px", margin: "0px" }}>no attachments</p>
          }
          {
            selectedFiles?.map((attach, i) =>
              <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "2px 0px",
                margin: "0px"
              }} key={i}>
                <p style={{ padding: "0px", margin: "0px" }}>{attach}</p>
                <DeleteIcon
                  onClick={() => {
                    deleteAttachements(i, listId, index);
                    // listId, index,
                    // let tasks = selectedFiles.filter((t) => t !== attach);
                    // setSelectedFiles([...tasks]);
                  }}
                  style={{ fontSize: "15px", cursor: "pointer" }} />
              </div>)
          }
        </div>

        <Dialog
          style={{ maxWidth: "530px", margin: "auto" }}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            console.log(startdate, enddate);
            let logs = task.logs;
            let time = new Date;
            logs.unshift(`Task updated at ${time.toLocaleDateString()} ${time.toLocaleTimeString()}`)
            updateTask({
              title,
              description,
              color: importance,
              priority,
              startDate: startdate,
              endDate: enddate,
              attachments: selectedFiles,
              logs
            }, listId, index, () => {
              handleClose();
            });

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
                  size="small"
                  fullWidth
                />
                <TextField
                  multiline
                  rowsMax={10}
                  rows={2}
                  margin="normal"
                  required
                  id="filled-required"
                  label="Descripton"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                />

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <TextField
                    margin="normal"
                    select
                    fullWidth
                    size="small"
                    style={{ minWidth: "110px", marginRight: "10px" }}
                    label="Importance"
                    value={importance}
                    onChange={(e) => setImportance(e.target.value)}
                    variant="outlined"
                  >
                    <MenuItem value="danger">
                      <span style={{ marginRight: "4px", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "red" }}></span> High
                    </MenuItem>
                    <MenuItem value="info">
                      <span style={{ marginRight: "4px", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "blueviolet" }}></span> Normal
                    </MenuItem>
                    <MenuItem value="warning">
                      <span style={{ marginRight: "4px", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "yellow" }}></span> low
                    </MenuItem>


                  </TextField>

                  <TextField
                    margin="normal"
                    select
                    fullWidth
                    size="small"
                    style={{ minWidth: "110px", marginRight: "10px" }}
                    label="Priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    variant="outlined"
                  >
                    <MenuItem value="P">
                      ASAP
                    </MenuItem>
                    <MenuItem value="P1">
                      priority 1
                    </MenuItem>
                    <MenuItem value="P2">
                      priority 2
                    </MenuItem>
                    <MenuItem value="P3">
                      priority 3
                    </MenuItem>
                    <MenuItem value="P4">
                      priority 4
                    </MenuItem>

                  </TextField>


                </div>

                <label style={{ margin: "0px", padding: "0px" }} >Start Date</label>
                <TextField
                  required
                  margin="dense"
                  fullWidth
                  size="small"
                  type="date"
                  value={startdate}
                  onChange={(e) => setStartDate(e.target.value)}
                  variant="outlined"
                />

                <label style={{ marginTop: "20px", padding: "0px" }} >End Date</label>
                <TextField
                  required
                  margin="dense"
                  fullWidth
                  size="small"
                  type="date"
                  value={enddate}
                  onChange={(e) => { setEndDate(e.target.value); console.log(e.target.value) }}
                  variant="outlined"
                />

                {
                  !calenderClicked &&
                  <>
                    <input
                      accept="application/pdf,
                  application/vnd.ms-excel, 
                  text/plain, 
                  application/msword,
                  application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      style={{ marginTop: "20px" }}
                      type="file"
                      onChange={(e) => {
                        let files = selectedFiles;
                        for (let i = 0; i < e.target.files.length; i++) {
                          let file = files.find((file) => file === e.target.files[i].name);
                          if (file === undefined) {
                            files.unshift(e.target.files[i].name);
                          }
                        }
                        setSelectedFiles([...files]);
                      }}
                      multiple
                    />

                    <div>
                      {
                        selectedFiles?.map((file, index) => <p style={{ padding: "2px 0px", margin: "0px" }} key={index}>{file}</p>)
                      }
                    </div>
                  </>
                }


              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button type="button" className="btn__cancel" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" className="btn__update" autoFocus>
                Update
              </button>
            </DialogActions>
          </form>
        </Dialog>
        <Dialog
          open={cardDeleteOpen}
          onClose={() => setCardDeleteOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            deleteTask(listId, task)
          }
          }>
            <DialogTitle id="alert-dialog-title">{task.title.toUpperCase()}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Typography style={{ color: "black" }}>Are you Sure to Delete this Task Permanently</Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button type="button" className="btn__cancel" onClick={() => setCardDeleteOpen(false)}>
                No
              </button>
              <button type="submit" className="btn__update" autoFocus>
                Yes
              </button>
            </DialogActions>
          </form>
        </Dialog>
        <Dialog
          open={teamsDialogOpen}
          onClose={() => setTeamsDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            // deleteTask(listId, task)
          }
          }>
            <DialogTitle id="alert-dialog-title">{task.title.toUpperCase()}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Paper>
                  <ul>
                    <li>jagan</li>
                    <li>bala</li>
                    <li>shekhar</li>
                  </ul>
                </Paper>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button type="submit" className="btn__cancel" autoFocus>
                Close
              </button>
            </DialogActions>
          </form>
        </Dialog>
        <Dialog
          style={{ maxWidth: "550px", margin: "auto" }}
          open={viewLogs}
          onClose={() => setViewLogs(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            // deleteTask(listId, task)
          }
          }>
            <DialogTitle id="alert-dialog-title">{task.title.toUpperCase()}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {
                  task.logs?.length !== 0 && task.logs.map((log, index) => (
                    <Paper style={{ margin: "8px 0px", padding: "7px 13px" }} elevation={3}>
                      {log}
                    </Paper>
                  ))
                }

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button type="button" className="btn__update" onClick={() => setViewLogs(false)}>
                Close
              </button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );

};

export default TaskItem;
