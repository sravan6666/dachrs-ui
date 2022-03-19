export default (tasks = [], action) => {
    switch(action.type){
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...tasks, action.payload]; 
        case 'UPDATE':
            return tasks; //logic will be updated here 
        case 'DELETE':
            return tasks;  //logic will be updated here       
        default:
            return tasks;     
    }
}