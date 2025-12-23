import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const tokenKey = 'token'


export const loginUser = createAsyncThunk(
'auth/loginUser',
async ({ email, password }, { rejectWithValue }) => {
try {
const res = await axios.post('https://zoomridebackend-2.onrender.com/api/auth/login', { email, password })
// expected { token, user }
return res.data
} catch (err) {
return rejectWithValue(err.response?.data?.message || 'Login failed')
}
}
)


const initialState = {
token: localStorage.getItem(tokenKey) || null,
user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
loading: false,
error: null,
}


const authSlice = createSlice({
name: 'auth',
initialState,
reducers: {
logout: (state) => {
state.token = null
state.user = null
localStorage.removeItem(tokenKey)
localStorage.removeItem('user')
},
setCredentials: (state, action) => {
const { token, user } = action.payload
state.token = token
state.user = user
localStorage.setItem(tokenKey, token)
localStorage.setItem('user', JSON.stringify(user))
},
},
extraReducers: (builder) => {
builder
.addCase(loginUser.pending, (state) => {
state.loading = true
state.error = null
})
.addCase(loginUser.fulfilled, (state, action) => {
state.loading = false
state.token = action.payload.token
state.user = action.payload.user || null
localStorage.setItem(tokenKey, action.payload.token)
if (action.payload.user) localStorage.setItem('user', JSON.stringify(action.payload.user))
})
.addCase(loginUser.rejected, (state, action) => {
state.loading = false
state.error = action.payload || 'Login failed'
})
},
})


export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer