import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  email: '',
  role: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload
    },
    setUserEmail: (state, action) => {
      state.email = action.payload
    },
    setUserRole: (state, action) => {
      state.role = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserName, setUserEmail, setUserRole } = userSlice.actions

export default userSlice.reducer