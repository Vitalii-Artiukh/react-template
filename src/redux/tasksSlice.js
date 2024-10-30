// import { createAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { addTask, deleteTask, fetchTasks, toggleCompleted } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder
      .addCase(toggleCompleted.pending, handlePending)
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      })
      .addCase(toggleCompleted.rejected, handleRejected)

      .addCase(fetchTasks.pending, handlePending)
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, handleRejected)

      .addCase(addTask.pending, handlePending)
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addTask.rejected, handleRejected)

      .addCase(deleteTask.pending, handlePending)
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteTask.rejected, handleRejected);
  },
  // reducers: {
  // // Виконається в момент старту HTTP-запиту
  // fetchingInProgress(state) {
  //   state.isLoading = true;
  // },
  // // Виконається якщо HTTP-запит завершився успішно
  // fetchingSuccess(state, action) {
  //   state.isLoading = false;
  //   state.error = null;
  //   state.items = action.payload;
  // },
  // // Виконається якщо HTTP-запит завершився з помилкою
  // fetchingError(state, action) {
  //   state.isLoading = false;
  //   state.error = action.payload;
  // },
  // },
});

// export const tasksReducer = tasksSlice.reducer;
export default tasksSlice.reducer;

// export const { fetchingError, fetchingInProgress, fetchingSuccess } =
//   tasksSlice.actions;
// export default tasksSlice.reducer;

//////////////////////////////////////////

// export const addTask = newTask => {
//   return {
//     type: 'tasks/addTask',
//     payload: newTask,
//   };
// };

// export const deleteTask = taskId => {
//   return {
//     type: 'tasks/deleteTask',
//     payload: taskId,
//   };
// };

// export const toggleCompleted = taskId => {
//   return {
//     type: 'tasks/toggleCompleted',
//     payload: taskId,
//   };
// };

//////////////////////////////////////////

// const slice = createSlice({
//   name: 'tasks',

//   initialState: {
//     items: [
//       { id: 0, text: 'Learn HTML and CSS', completed: true },
//       { id: 1, text: 'Get good at JavaScript', completed: true },
//       { id: 2, text: 'Master React', completed: false },
//       { id: 3, text: 'Discover Redux', completed: false },
//       { id: 4, text: 'Build amazing apps', completed: false },
//     ],
//   },

//   reducers: {
//     addTask: (state, action) => {
//       return {
//         ...state,
//         items: [...state.items, action.payload],
//       };
//     },
//     deleteTask: (state, action) => {
//       return {
//         ...state,
//         items: state.items.filter(task => task.id !== action.payload),
//       };
//     },
//     toggleCompleted: (state, action) => {
//       return {
//         ...state,
//         items: state.items.map(task => {
//           if (task.id !== action.payload) {
//             return task;
//           }
//           return {
//             ...task,
//             completed: !task.completed,
//           };
//         }),
//       };
//     },
//   },
// });

// export const { addTask, deleteTask, toggleCompleted } = slice.actions;
// export default slice.reducer;

////////////////////////

// export const addTask = createAction('tasks/addTask');
// export const deleteTask = createAction('tasks/deleteTask');
// export const toggleCompleted = createAction('tasks/toggleCompleted');

// const initialState = {
//   items: [
//     { id: 0, text: 'Learn HTML and CSS', completed: true },
//     { id: 1, text: 'Get good at JavaScript', completed: true },
//     { id: 2, text: 'Master React', completed: false },
//     { id: 3, text: 'Discover Redux', completed: false },
//     { id: 4, text: 'Build amazing apps', completed: false },
//   ],
// };

// export default function tasksReducer(state = initialState, action) {
//   switch (action.type) {
//     //////  ADD reducer function /////////////
//     case 'tasks/addTask': {
//       return {
//         ...state,
//         items: [...state.items, action.payload],
//       };
//     }

//     //////  DELETE reducer function /////////////
//     case 'tasks/deleteTask': {
//       return {
//         ...state,
//         items: state.items.filter(task => task.id !== action.payload),
//       };
//     }

//     //////  CHECKBOX reducer function /////////////
//     case 'tasks/toggleCompleted':
//       return {
//         ...state,
//         items: state.items.map(task => {
//           if (task.id !== action.payload) {
//             return task;
//           }
//           return {
//             ...task,
//             completed: !task.completed,
//           };
//         }),
//       };

//     default:
//       return state;
//   }
// }
