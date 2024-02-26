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

const initialState = {
  tasks: [],
  filters: {
    all: 'selected',
    active: '',
    completed: '',
  },
  maxId: 100,
  newTaskForm: {
    label: '',
    min: '',
    sec: '',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      if (action.task.trim()) {
        const newTask = {
          text: action.task,
          completedStatus: false,
          editingStatus: false,
          date: new Date(),
          id: state.maxId++,
          min: action.min,
          sec: action.sec,
          paused: false,
          over: false,
          timer: null,
        };
        return { ...state, tasks: [...state.tasks, { ...newTask }] };
      }
      return state;
    }
    case UPDATE_TASK: {
      const idx = state.tasks.findIndex((el) => el.id === action.id);
      const oldTask = state.tasks[idx];
      const newTask = { ...oldTask, editingStatus: !oldTask.editingStatus };
      return { ...state, tasks: [...state.tasks.slice(0, idx), newTask, ...state.tasks.slice(idx + 1)] };
    }
    case SET_UPDATED_TASK: {
      const idx = state.tasks.findIndex((el) => el.id === action.id);
      const oldTask = state.tasks[idx];
      const newTask = { ...oldTask, text: action.value.trim(), editingStatus: !oldTask.editingStatus };
      return { ...state, tasks: [...state.tasks.slice(0, idx), newTask, ...state.tasks.slice(idx + 1)] };
    }
    case COMPLETE_TASK: {
      const idx = state.tasks.findIndex((el) => el.id === action.id);
      const oldTask = state.tasks[idx];
      const newTask = { ...oldTask, completedStatus: !oldTask.completedStatus };
      return { ...state, tasks: [...state.tasks.slice(0, idx), newTask, ...state.tasks.slice(idx + 1)] };
    }
    case DELETE_TASK: {
      const idx = state.tasks.findIndex((el) => el.id === action.id);
      const newArray = state.tasks.filter((el, index) => index !== idx);
      return { ...state, tasks: [...newArray] };
    }
    case SHOW_ALL_TASK:
      return {
        ...state,
        filters: {
          all: 'selected',
          active: '',
          completed: '',
        },
      };
    case SHOW_ACTIVE_TASK:
      return {
        ...state,
        filters: {
          all: '',
          active: 'selected',
          completed: '',
        },
      };
    case SHOW_COMPLETED_TASK:
      return {
        ...state,
        filters: {
          all: '',
          active: '',
          completed: 'selected',
        },
      };
    case CLEAR_COMPLETED_TASK: {
      const newArray = state.tasks.filter((el) => !el.completedStatus);
      // document.getElementsByClassName('toggle').checked = false;
      return { ...state, tasks: [...newArray] };
    }
    case COUNT_ACTIVE_TASKS: {
      const activeTasks = state.tasks.filter((el) => !el.completedStatus);
      return activeTasks.length;
    }
    case SET_TIMER: {
      const idx = state.tasks.findIndex((el) => el.id === action.id);
      const oldTask = state.tasks[idx];
      const newTask = { ...oldTask, ...action.time };
      return { ...state, tasks: [...state.tasks.slice(0, idx), newTask, ...state.tasks.slice(idx + 1)] };
    }
    case STOP_TIMER: {
      const idx = state.tasks.findIndex((el) => el.id === action.id);
      const oldTask = state.tasks[idx];
      const newTask = { ...oldTask, paused: true };
      return { ...state, tasks: [...state.tasks.slice(0, idx), newTask, ...state.tasks.slice(idx + 1)] };
    }
    case PLAY_TIMER: {
      const idx = state.tasks.findIndex((el) => el.id === action.id);
      const oldTask = state.tasks[idx];
      const { paused, timer } = oldTask;
      if (!timer)
        return {
          ...state,
          tasks: [
            ...state.tasks.slice(0, idx),
            {
              ...oldTask,
              timer: true,
            },
            ...state.tasks.slice(idx + 1),
          ],
        };
      if (paused && timer)
        return {
          ...state,
          tasks: [...state.tasks.slice(0, idx), { ...oldTask, paused: false }, ...state.tasks.slice(idx + 1)],
        };
      break;
    }

    default:
      return state;
  }
};

export default reducer;
