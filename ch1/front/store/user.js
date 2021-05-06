export const state = () => ({
    me :null,
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
    }],
    hasMoreFollower:true,
    hasMoreFollowing:true
  })

  const totalFollowers = 8;
  const totalFollowings = 6;
  const limit = 3;

  
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
    },
    loadFollowings(state) {
      const diff = totalFollowings - state.followingList.length;
      const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
        id: Math.random().toString(),
        nickname: Math.floor(Math.random() * 1000),
      }));
      state.followingList = state.followingList.concat(fakeUsers);
      state.hasMoreFollowing = fakeUsers.length === limit;
    },
    loadFollowers(state) {
      const diff = totalFollowers - state.followerList.length;
      const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
        id: Math.random().toString(),
        nickname: Math.floor(Math.random() * 1000),
      }));
      state.followerList = state.followerList.concat(fakeUsers);
      state.hasMoreFollower = fakeUsers.length === limit;
    },
  };

export const actions = { //비동기적 작업을 위해 actions를 사용함
    // context object 안에 있는 것들
    // commit : mutation 함수를 실행
    // dispatch : actions를 실행
    signUp({commit, state}, payload){
        // 서버에 회원가입 요청을 보냄 payload에 회원정보 들어감
        console.log(this.$axios);
        this.$axios.post('http://localhost:3085/user', {
          email:payload.email, nickname:payload.nickname, password:payload.password
        }).then((data) => { // promise
          console.log(data);
        }).catch((error)=>{
          console.error(error);
        }); //rest api
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
    },
    loadFollowers({ commit, state }, payload) {
      if (state.hasMoreFollower) {
        commit('loadFollowers');
      }
    },
    loadFollowings({ commit, state }, payload) {
      if (state.hasMoreFollowing) {
        commit('loadFollowings');
      }
    },
}