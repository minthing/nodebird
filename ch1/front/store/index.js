export const state = () => ({
    name :'index',
  })
  
  export const mutations = { // 일반 객체로 만들어야 함
    increment(state) {
      state.name='index'
    }
  }