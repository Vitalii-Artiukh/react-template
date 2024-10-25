// import { createAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// export const setStatusFilter = value => {
//   return {
//     type: 'filters/setStatusFilter',
//     payload: value,
//   };
// };

const slice = createSlice({
  name: 'filters',

  initialState: { status: 'all' },

  reducers: {
    setStatusFilter(state, action) {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export const { setStatusFilter } = slice.actions;
export default slice.reducer;

//////////////////////////////////////////////////

// const initialState = {
//   status: 'all',
// };

// export default function filtersReducer(state = initialState, action) {
//   switch (action.type) {
//     //////  CHANGE OF VALUE reducer function /////////////
//     case 'filters/setStatusFilter':
//       return {
//         ...state,
//         status: action.payload,
//       };

//     default:
//       return state;
//   }
// }

// export const setStatusFilter = createAction('filters/setStatusFilter');
