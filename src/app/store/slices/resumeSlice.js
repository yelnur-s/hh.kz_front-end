import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { END_POINT } from '@/conifig/end-point'



export const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    resumes: [],
    resume: {},
    isLoading: true,
  },
  reducers: {
    setMyResumes: (state, action) => {
        state.resumes = action.payload.resumes
    },
    uppendResume: (state, action) => {
        state.resumes = [...state.resumes, action.payload.newresume]
    },
    setResume: (state, action) => {
      state.resume = action.payload.resume
    },
    handleDeleteResume: (state, action) => {
      let resumes = [...state.resumes]
      resumes = resumes.filter(item => item.id !== action.payload)
      state.resumes = resumes
    },
    setLoadingFalse: (state, action) => {
      state.isLoading = false
    },
    setLoadingTrue: (state, action) => {
      state.isLoading = true
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoadingTrue, setMyResumes, uppendResume, setResume, handleDeleteResume, setLoadingFalse } = resumeSlice.actions

export const getMyResumes = () => async (dispatch) => {
    
     try {
        const res = await axios.get(`${END_POINT}/api/resume`);
        console.log(res.data)
        dispatch(setMyResumes({resumes: res.data}))
     }catch(e) {
        alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта!")
     }
    
  }

  export const getResumeById = (id) => async (dispatch) => {
   try {
      const res = await axios.get(`${END_POINT}/api/resume/${id}`);
      console.log(res.data)
      dispatch(setResume({resume: res.data}))
      dispatch(setLoadingFalse())
   } catch(e) {
      alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта!")
   }
  
}

export const createResume = (sendData, router) => async (dispatch) => {
    try {
        const res = await axios.post(`${END_POINT}/api/resume`, sendData);
        router.push("/resumes")
        dispatch(uppendResume({newresume: res.data}))
     }catch(e) {
        console.log(e)
        alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта!")
     }
}

export const editResume = (sendData, router) => async (dispatch) => {
   try {
       const res = await axios.put(`${END_POINT}/api/resume`, sendData);
       router.push("/resumes")
    }catch(e) {
       console.log(e)
       alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта!")
    }
}

export const deleteResume = (id) => async (dispatch) => {
   try {
       const res = await axios.delete(`${END_POINT}/api/resume/${id}`);
       dispatch(handleDeleteResume(id))
       
    }catch(e) {
       console.log(e)
       alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта!")
    }
}



export default resumeSlice.reducer