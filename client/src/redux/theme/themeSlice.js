import {createSlice} from "@reduxjs/toolkit"

const initialState={
    theme:"light"
}

export const themeSlice=createSlice({
    name:"theme",
    initialState,

    reducers:{
        toogleTheme:(state)=>{
            state.theme=state.theme==="dark"?"light":"dark"
        }
    }
})

export const {toogleTheme} =themeSlice.actions

export default themeSlice.reducer