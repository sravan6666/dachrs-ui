import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import React, { useState, useEffect } from 'react';
import { infoColor, warningColor } from '../../styleVariables';
import reorder, { reorderQuoteMap } from './reorder';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import Column from './Column';
import { makeStyles } from '@material-ui/core/styles';
import { Tasks } from './taskboardUtil';

import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  taskboard: {
    backgroundColor: "#f2f9ff",
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
    maxHeight: '100%',
    whiteSpace: 'normal',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
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

const Taskboard = (props) => {
  const classes = useStyles();
  const [columns, setColumns] = useState(Tasks);
  const [ordered, setOrdered] = useState(Object.keys(Tasks));
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const [dangerOpen, setDangerOpen] = React.useState(true);
  const [successOpen, setSuccessOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
  };

  const onDragEnd = result => {
    // dropped nowhere 
    console.log(result.source);
    console.log(result.destination);
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;



    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }


    // reordering column
    if (result.type === 'COLUMN') {
      const orderedList = reorder(ordered, source.index, destination.index);
      setOrdered(orderedList);
      return;
    }

    let time = new Date;

    columns[source.droppableId][source.index].logs.unshift(`Task moved from ${source.droppableId}[${source.index}] to ${destination.droppableId}[${destination.index}] at ${time.toLocaleDateString()} ${time.toLocaleTimeString()}`)
    // columns[destination.droppableId][columns[destination.droppableId].length - 1].logs.unshift(`Task added from ${source.droppableId} to ${destination.droppableId} with title ${columns[source.droppableId][source.index].title} at ${time.toLocaleTimeString()}`)

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination
    });



    setColumns(data.quoteMap);

  };



  const addtask = (newtask, title, onsuccess) => {
    //let time = new Date;
    //columns[title].splice(columns[title].length - 1, 0, newtask);
    columns[title].unshift(newtask);
    //columns[title][columns[title].length - 1].logs.unshift(`added task with title ${newtask.title} at ${time.toLocaleTimeString()}`)
    onsuccess(columns[title]);
    setColumns(columns);
    setOrdered(Object.keys(columns))
  }

  const updateTask = (task, title, index, onsuccess) => {
    //let time = new Date;
    columns[title][index] = task;
    //columns[title][columns[title].length - 1].logs.unshift(`updated task with title ${task.title} at ${time.toLocaleTimeString()}`)
    setColumns(columns);
    setOrdered(Object.keys(columns))
    onsuccess();
  }

  const addColumn = (title) => {
    //let time = new Date;
    //columns[title] = [{ logs: [], title: title }];
    columns[title] = [];
    //columns[title][columns[title].length - 1].logs.unshift(`Created Column with title ${title} at ${time.toLocaleTimeString()}`)
    setColumns(columns);
    setOrdered(Object.keys(columns))
    setOpen(false);
    setTitle("");
  }

  const deleteColumn = (title) => {
    delete columns[title];
    setColumns(columns);
    setOrdered(Object.keys(columns))
  }

  const deleteTask = (title, task) => {
    //let time = new Date;
    columns[title] = columns[title].filter((t) => t !== task);
    // columns[title][columns[title].length - 1].logs.unshift(`Task deleted with title ${task.title} at ${time.toLocaleTimeString()}`)
    setColumns(columns);
    setOrdered(Object.keys(columns))
  }

  const renameColumn = (title, columnName) => {
    //let time = new Date;
    //columns[title][columns[title].length - 1].logs.unshift(`Renamed Column from ${title} to ${columnName} at ${time.toLocaleTimeString()}`)
    let newobj = {};
    for (let t of Object.keys(columns)) {
      if (t === title) {
        newobj[columnName] = columns[t];
      }
      else {
        newobj[t] = columns[t];
      }
    }
    setColumns(newobj);
    setOrdered(Object.keys(newobj))
  }

  const deleteAttachements = (i, title, index) => {
    console.log(columns[title][index].attachments.splice(i, 1));
    setColumns(columns);
    setOrdered(Object.keys(columns))
  }




  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="taskboard" type="COLUMN">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={classes.taskboard}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}>
              <div style={{ marginRight: "15px" }}>
                <button
                  style={{
                    marginLeft: "10px",
                    marginTop: "10px"
                  }}
                  className="btn__update"
                  onClick={() => handleClickOpen()}>
                  add new Column
                </button>
              </div>
              <div style={{ marginTop: "7px", display: "flex", flexDirection: "row", marginRight: "20px" }}>
                {/* <Alert style={{ marginRight: "10px", border: "1px solid red" }} severity="error">The Task is not Yet Done — check it out!</Alert> */}
                <Collapse in={dangerOpen}>
                  <Alert
                    severity="error"
                    style={{ padding: "0px 10px", marginRight: "10px", border: "1px solid red" }}
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setDangerOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    The Task is not Yet Done — check it out!
                  </Alert>
                </Collapse>
                <Collapse in={successOpen}>
                  <Alert
                    style={{ padding: "0px 10px", border: "1px solid green" }}
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setSuccessOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    Success — check it out!
                  </Alert>
                </Collapse>
                {
                  !dangerOpen && !successOpen &&
                  <button
                    style={{
                      marginLeft: "10px",
                      marginTop: "0px"
                    }}
                    className="btn__update"
                    onClick={() => { setDangerOpen(true); setSuccessOpen(true) }}>
                    Notifications
                  </button>
                }
                {/* <Alert style={{ border: "1px solid green" }} severity="success">Success — check it out!</Alert> */}
              </div>
            </div>
            {ordered.map((key, index) => (
              <Column
                deleteAttachements={deleteAttachements}
                renameColumn={renameColumn}
                deleteTask={deleteTask}
                deleteColumn={deleteColumn}
                updateTask={updateTask}
                addTask={addtask}
                key={key}
                index={index}
                title={key}
                tasks={columns[key]}
              />
            ))}
          </div>
        )}

      </Droppable>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          addColumn(title);
        }
        }>
          {/* <DialogTitle id="alert-dialog-title">Task Board</DialogTitle> */}
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
            <button type="button" className="btn__cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn__update" autoFocus>
              Add
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </DragDropContext>
  );
};

export default Taskboard;
