import axios from 'axios';

const url = 'http://127.0.0.1:5000';

export const fetchTasks = () => axios.get(url);
export const createTask = (newTask) => axios.post(url, newTask) ;
export const updateTask = (id, updatedTask) => axios.patch('${url}/${id}', updatedTask);
export const deleteTask = (id) => axios.delete('${url}/${id}');