import { Draggable, Droppable } from 'react-beautiful-dnd';

import React from 'react';
import TaskItem from './TaskItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Paper } from '@material-ui/core';

class InnerTaskList extends React.Component {
  shouldComponentUpdate(nextProps) {
    // console.log(nextProps.tasks, this.props.tasks);
    // if (nextProps.tasks !== this.props.tasks) {
    //   return true;
    // }
    // return false;
    return true;
  }

  constructor(props) {
    super(props)

    this.state = {
      viewLogs: false,
    }
  }

  render() {

    return this.props.tasks.map((task, index) => (

      <Draggable
        key={`${index}-${task.title}`}
        draggableId={`${index}-${task.title}`}
        index={index}
      >
        {(dragProvided, dragSnapshot) => (
          <TaskItem
            deleteAttachements={this.props.deleteAttachements}
            index={index}
            listId={this.props.listId}
            updateTask={this.props.updateTask}
            deleteTask={this.props.deleteTask}
            key={task.id}
            task={task}
            isDragging={dragSnapshot.isDragging}
            provided={dragProvided}
          />
        )}
      </Draggable>

    ));
  }
}

class InnerList extends React.Component {
  render() {
    const { tasks, dropProvided, updateTask, listId, deleteTask, deleteAttachements } = this.props;

    return (
      <div style={{ minHeight: "1px" }} ref={dropProvided.innerRef}>
        <InnerTaskList
          deleteAttachements={deleteAttachements}
          listId={listId}
          updateTask={updateTask}
          deleteTask={deleteTask}
          tasks={tasks} />
        {dropProvided.placeholder}
      </div>
    );
  }
}

class TaskList extends React.Component {
  static defaultProps = {
    listId: 'LIST'
  };


  render() {

    const {
      ignoreContainerClipping,
      isDropDisabled,
      listId,
      tasks,
      title,
      updateTask,
      deleteTask,
      deleteAttachements
    } = this.props;

    return (
      <Droppable

        droppableId={listId}
        ignoreContainerClipping={ignoreContainerClipping}
        isDropDisabled={isDropDisabled}
      >

        {(dropProvided, dropSnapshot) => (
          <InnerList
            deleteAttachements={deleteAttachements}
            listId={listId}
            deleteTask={deleteTask}
            updateTask={updateTask}
            tasks={tasks}
            title={title}
            dropProvided={dropProvided} />
        )}
      </Droppable>
    );
  }
}

export default TaskList;
