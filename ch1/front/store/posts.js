// index.js 의 module로 동작

export const state = () => ({
    mainPosts :[],
    hasMorePost:true, //인피니트 스크롤링을 위한 준비
  })

  const totalPosts = 51;
  const limit = 10;
  
  export const mutations = { // 일반 객체로 만들어야 함
    addMainPosts(state, payload) {
      state.mainPosts.unshift(payload);
    },
    removeMainPosts(state, payload) {
      const index = state.mainPosts.findIndex(v => v.id === payload.id);
      state.mainPosts.splice(index, 1);
    },
    addComment(state, payload){
      const index = state.mainPosts.findIndex(v => v.id === payload.postId);
      state.mainPosts[index].Comments.unshift(payload);
    },
    loadPosts(state){
      const diff = totalPosts - state.mainPosts.length; // 아직 안 불러온 게시글 수 (계속 바뀜)
      const fakePosts = Array(diff > limit ? limit:diff).fill().map(v => ({
        id:Math.random().toString(),
        User:{
          id:1,
          nickname:'minthing'
        },
        content:`${Math.random().toString()}번째 게시물 입니다.`,
        Comments:[],
        Images:[],
      }));
      state.mainPosts = state.mainPosts.concat(fakePosts);
      state.hasMorePost = fakePosts.length === limit; // 10의 배수가 아니면 남은 포스트 갯수가 10 이하.. 이므로 마지막 페이지임
    },
    concatImagePaths(state, payload) {
      state.imagePaths = state.imagePaths.concat(payload);
    },
    removeImagePath(state, payload) {
      state.imagePaths.splice(payload, 1);
    }
  }

  export const actions = {
    add({commit}, payload){
      commit('addMainPosts', payload) // index와 function name이 겹칠 경우 {root:true}를 넣으면 index에 있는 애 불러옴
    },

    remove({commit}, payload){
      commit('removeMainPosts', payload) 
    },

    addComment({commit}, payload){
      commit('addComment', payload);
    },
    loadPosts({commit, state}, payload){
      if(state.hasMorePost){ // 쓸데없는 요청 막기
        commit('loadPosts', payload);
      }
    },
    uploadImages({ commit }, payload) {
      this.$axios.post('http://localhost:3085/post/images', payload, {
        withCredentials: true,
      })
        .then((res) => {
          commit('concatImagePaths', res.data);
        })
        .catch(() => {
  
        })
    }
  }