import {
  ADD_TASK,
  UPDATE_TASK,
  SET_UPDATED_TASK,
  COMPLETE_TASK,
  DELETE_TASK,
  SHOW_ALL_TASK,
  SHOW_ACTIVE_TASK,
  SHOW_COMPLETED_TASK,
  CLEAR_COMPLETED_TASK,
  COUNT_ACTIVE_TASKS,
  PLAY_TIMER,
  STOP_TIMER,
  SET_TIMER,
} from './constants';

export const addTaskAC = (task, min, sec) => ({
  type: ADD_TASK,
  task,
  min,
  sec,
});

export const updateTaskAC = (id) => ({
  type: UPDATE_TASK,
  id,
});

export const setUpdatedTask = (id, value) => ({
  type: SET_UPDATED_TASK,
  id,
  value,
});

export const completeTaskAC = (id) => ({
  type: COMPLETE_TASK,
  id,
});

export const deleteTaskAC = (id) => ({
  type: DELETE_TASK,
  id,
});

export const showAllTasksAC = () => ({
  type: SHOW_ALL_TASK,
});

export const showActiveTasksAC = () => ({
  type: SHOW_ACTIVE_TASK,
});

export const showCompletedTasksAC = () => ({
  type: SHOW_COMPLETED_TASK,
});

export const clearCompletedTasksAC = () => ({
  type: CLEAR_COMPLETED_TASK,
});

export const countActiveTasksAC = () => ({
  type: COUNT_ACTIVE_TASKS,
});

export const setTimerAC = (id, time) => ({
  type: SET_TIMER,
  id,
  time,
});

export const playTimerAC = (id) => ({
  type: PLAY_TIMER,
  id,
});

export const stopTimerAC = (id) => ({
  type: STOP_TIMER,
  id,
});
