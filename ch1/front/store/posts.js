// index.js 의 module로 동작

export const state = () => ({
    mainPosts :[],
  })
  
  export const mutations = { // 일반 객체로 만들어야 함
    addMainPosts(state, payload) {
      state.mainPosts.unshift(payload);
    },
    removeMainPosts(state, payload) {
      const index = state.mainPosts.findIndex(v => v.id === payload.id);
      state.mainPosts.splice(index, 1);
    }
  }

  export const actions = {
    add({commit}, payload){
      commit('addMainPosts', payload) // index와 function name이 겹칠 경우 {root:true}를 넣으면 index에 있는 애 불러옴
    },

    remove({commit}, payload){
      commit('removeMainPosts', payload) 
    }
  }