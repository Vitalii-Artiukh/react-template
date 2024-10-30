// import { createAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// export const setStatusFilter = value => {
//   return {
//     type: 'filters/setStatusFilter',
//     payload: value,
//   };
// };

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    status: 'all',
  },
  reducers: {
    setStatusFilter(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setStatusFilter } = filtersSlice.actions;
export default filtersSlice.reducer;

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
