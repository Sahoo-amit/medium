import {create} from 'zustand'

export const AuthStore = create((set)=>({
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    userId: localStorage.getItem("userId") || null,

    storeToken: (token,userId)=>{
        localStorage.setItem("token",token),
        localStorage.setItem("userId",userId)
        set({token, userId, isAuthenticated:true})
    },

    removeToken: ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        set({token:null, userId:null, isAuthenticated:false})
    }
}))