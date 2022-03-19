import { infoColor, warningColor } from '../../styleVariables';

import { Draggable } from 'react-beautiful-dnd';
import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  taskboard: {
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 56px)'
    },
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 64px)'
    }
  },
  wrapper: {
    width: '280px',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1) / 2,
    paddingLeft: theme.spacing(1) / 2,
    boxSizing: 'border-box',
    display: 'inline-block',
    verticalAlign: 'top',
    height: '100%'
  },
  list: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '92%',
    whiteSpace: 'normal',
    backgroundColor: 'rgba(255, 228, 181,0.3)',
    borderRadius: theme.shape.borderRadius
  },
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    letterSpacing: '0.02rem',
    padding: theme.spacing(1),
    margin: 0,
    fontWeight: 500,
    textTransform: 'uppercase',
    fontSize: '12px'
  },
  task: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[1],
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
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
  }
}));

const Column = ({ title, tasks, index, addTask, updateTask, deleteAttachements, deleteColumn, deleteTask, renameColumn }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [columnRenameDialog, setColumnRenameDialog] = React.useState(false);
  const [tasktitle, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [columntitle, setColumntitle] = useState(title);
  const [importance, setImportance] = React.useState("danger");
  const [priority, setPriority] = React.useState("P1");
  const [enddate, setEndDate] = React.useState("");
  const [startdate, setStartDate] = React.useState("");
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [cardDeleteOpen, setCardDeleteOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleColumnTitleOpen = () => {
    setColumnRenameDialog(true);
  };

  const handleColumnTitleClose = () => {
    setColumnRenameDialog(false);
    setColumntitle("")
  };


  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div className={classes.wrapper} key={index}>
          <div className={classes.list}>
            <Typography style={{ cursor: "pointer", userSelect: "none", fontSize: "18x", fontWeight: "600" }} onDoubleClick={() => handleColumnTitleOpen(true)} className={classes.header}>{title}
              <span onClick={() => setCardDeleteOpen(true)} style={{ float: "right", cursor: "pointer" }}>x</span>
            </Typography>


            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className={classes.cards}
            >
              <TaskList
                deleteAttachements={deleteAttachements}
                deleteTask={deleteTask}
                updateTask={updateTask}
                listId={title}
                tasks={tasks} />

              <div style={{
                marginTop: "15px",
                textAlign: "center"
              }}>
                <button
                  onClick={() => {
                    handleClickOpen();
                  }
                  }
                  className="add_new_task_btn"
                >
                  +
                </button>
              </div>
              {
                !tasks.length &&
                <div
                  style={{
                    marginTop: "40px",
                    color: "#787575",
                    textAlign: "center",
                    fontFamily: "sans-serif"
                  }}
                >
                  <CheckCircleOutlineIcon style={{
                    marginBottom: "0px",
                    fontSize: "60px"
                  }} />
                  <h4 style={{
                    marginBottom: "16px",
                    marginTop: "0px",
                    fontSize: "20px",
                  }}>No Tasks</h4>
                  <h5 style={{
                    margin: "0px",
                    padding: "0px"
                  }}>Drag tasks here</h5>
                  <small style={{
                    margin: "0px",
                    padding: "0px"
                  }}>or click + to add new tasks</small>
                </div>
              }
            </div>
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
              let time = new Date;
              addTask({
                title: tasktitle,
                description,
                color: importance,
                startDate: startdate,
                endDate: enddate,
                priority,
                attachments: selectedFiles,
                logs: [`Task created with Title ${tasktitle} at ${time.toLocaleDateString()} ${time.toLocaleTimeString()}`]
              }, title, (t) => {
                console.log(t);
                setImportance("danger");
                setPriority("P1")
              });
              setTitle("");
              setDescription("");
              handleClose();
              setStartDate("");
              setEndDate("");
            }
            }>
              <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">

                  <TextField
                    margin="normal"
                    required
                    id="filled-required"
                    label="Title"
                    value={tasktitle}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />

                  <TextField
                    margin="normal"
                    required
                    multiline
                    rowsMax={10}
                    rows={2}
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
                      required
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
                      required
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
                      <MenuItem value="P1">
                        ASAP
                      </MenuItem>
                      <MenuItem value="P2">
                        priority 1
                      </MenuItem>
                      <MenuItem value="P3">
                        priority 2
                      </MenuItem>
                      <MenuItem value="P4">
                        priority 3
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
                    onChange={(e) => setEndDate(e.target.value)}
                    variant="outlined"
                  />

                  <input
                    accept="application/pdf,
                  application/vnd.ms-excel, 
                  text/plain, 
                  application/vnd.ms-powerpoint,
                  application/msword,
                  application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    style={{ marginTop: "20px" }}
                    type="file"
                    onChange={(e) => {
                      let files = selectedFiles;
                      for (let i = 0; i < e.target.files.length; i++) {
                        //let file = files.find(e.target.files[i].name.toString());
                        //console.log(file);
                        files.unshift(e.target.files[i].name);
                      }
                      setSelectedFiles([...files]);
                    }}
                    multiple
                  />

                  <div>
                    {
                      selectedFiles?.map((file, index) => <p key={index}>{file}</p>)
                    }
                  </div>

                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button type="button" className="btn__cancel" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn__update" autoFocus>
                  Add
                </button>
              </DialogActions>
            </form>
          </Dialog>

          <Dialog
            open={columnRenameDialog}
            onClose={handleColumnTitleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <form onSubmit={(e) => {
              e.preventDefault();
              renameColumn(title, columntitle);
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
                    value={columntitle}
                    onChange={(e) => setColumntitle(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />

                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button type="button" className="btn__cancel" onClick={handleColumnTitleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn__update" autoFocus>
                  Add
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
              deleteColumn(title)
            }
            }>
              <DialogTitle id="alert-dialog-title">{title.toUpperCase()}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography>Are you Sure to Delete this Column Permanently</Typography>
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

        </div>
      )
      }
    </Draggable >
  );
};

export default Column;
