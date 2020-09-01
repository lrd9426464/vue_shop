import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {
  state: { 
    count_1:1
   },
  mutations: { 
    add_1(state){
      // state.rootState.count++
    }  
  },
  getters:{
    sad(state,getters,rootState){
      return rootState.count+2
    }
  }
}

export default new Vuex.Store({
  state: {
    count:0
  },
  getters:{
    countDouble(state){
      return state.count*2
    }
  },
  mutations: {
    add(state){
      state.count++
    }
  },
  actions: {
    increment(context){
      setInterval(() => {
        context.commit("add")       
      }, 1000);
    }
  },
  modules: {
    a:moduleA
  }
})
