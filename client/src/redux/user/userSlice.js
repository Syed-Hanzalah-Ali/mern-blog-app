import {createSlice} from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    loading:false,
    error:null
}

export const userSlice=createSlice({
    name:"user",
    initialState,

    reducers:{
        signinStart:(state)=>{
            state.loading=true
            state.error=null
        },

        signInSuccess:(state,action)=>{
            state.loading=false
            state.currentUser=action.payload
            state.error=null
        },

        signInFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})

export const {
    signinStart,
    signInSuccess,
    signInFailure
} =userSlice.actions

export default userSlice.reducer