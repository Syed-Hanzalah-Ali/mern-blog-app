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
        },

        // update

        updateStart:(state)=>{
            state.loading=true,
            state.error=null
        },
        updateSuccess:(state,action)=>{
            state.loading=false,
            state.currentUser=action.payload,
            state.error=null
        },
        updateFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },

        // delete
        deleteStart:(state)=>{
            state.loading=true,
            state.error=null
        },
        deleteSuccess:(state)=>{
            state.loading=false,
            state.currentUser=null,
            state.error=null
        },
        deleteFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },

        // signout
        
        signoutSuccess:(state)=>{
            state.loading=false,
            state.currentUser=null,
            state.error=null
        },
    
    }
})

export const {
    signinStart,
    signInSuccess,
    signInFailure,
    updateStart,
    updateSuccess,
    updateFailure,
    deleteStart,
    deleteSuccess,
    deleteFailure,
    signoutSuccess
} =userSlice.actions

export default userSlice.reducer