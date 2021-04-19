export const state = () => ({
    me :{nickname:'minthing'},
    followingList:[{
      id:1, nickname:'one'
    },{
      id:2, nickname:'two'
    },{
      id:3, nickname: 'three'
    }],
    followerList:[{
      id:1, nickname:'one'
    },{
      id:2, nickname:'two'
    },{
      id:3, nickname: 'three'
    }]
  })
  
  export const mutations = { // 일반 객체로 만들어야 함
    setMe(state, payload) { // payload : state를 바꿀 수 있게 해줌
      state.me = payload; // 비동기 작업이 있으면 안됨! ajax 요청도 안됨!
    },
    changeNickname(state, payload){
      state.me.nickname = payload.nickname
    },
    addFollowing(state, payload){
      state.following.push(payload)
    },
    addFollower(state, payload){
      state.followerList.push(payload)
    },
    removeFollowing(state, payload){ 
      const index = state.followingList.findIndex(v => v.id === payload.id);
      state.followingList.splice(index, 1)
    },
    removeFollower(state, payload){
      const index = state.followerList.findIndex(v => v.id === payload.id);
      state.followerList.splice(index, 1)
    }

  }

export const actions = { //비동기적 작업을 위해 actions를 사용함
    // context object 안에 있는 것들
    // commit : mutation 함수를 실행
    // dispatch : actions를 실행
    signUp({commit, state}, payload){
        // 서버에 회원가입 요청을 보냄 payload에 회원정보 들어감
        commit('setMe', payload);
    },
    logIn({commit}, payload){
      commit('setMe', payload);

    },
    logOut({commit}, payload){
      commit('setMe', null);

    },
    changeNickname({commit}, payload){
      commit('changeNickname', payload)
    },
    addFollowing({commit}, payload){
      commit('addFollowing', payload)
    },
    addFollower({commit}, payload){
      commit('addFollower', payload)
    },
    removeFollowing({commit}, payload){ //비동기요청
      commit('removeFollowing', payload)
    },
    removeFollower({commit}, payload){
      commit('removeFollower', payload)
    }

}