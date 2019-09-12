import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login:0
  },
  mutations: {
    SetLogin:(state,data)=>{
      sessionStorage.setItem('login',data)
      state.login = data
    }
  },getters:{
    isLogin(state){
      if(!state.login){
        state.login = sessionStorage.getItem('login')
        
      }
      return state.login
    }
  }
})
