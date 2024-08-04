const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const endpoints = {
    SIGNUP_API: `${BASE_URL}/user/signup`,
    LOGIN_API: `${BASE_URL}/user/login`,
    LOGOUT_API: `${BASE_URL}/user/logout`,
    CREATE_TASK: `${BASE_URL}/task/createNewTask`,
    GET_TASK: `${BASE_URL}/task/fetchTaskById/:id`,
    GET_TASK_LIST: `${BASE_URL}/task/fetchAllTasks`,
    UPDATE_TASK: `${BASE_URL}/task/updateTask`,
    DELETE_TASK: `${BASE_URL}/task/deleteTask`,
    MARK_AS_COMPLETED: `${BASE_URL}/task/markAsCompleted`,
  };
  
  export default endpoints;