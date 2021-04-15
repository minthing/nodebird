// index.js 의 module로 동작

export const state = () => ({
    name :'posts',
  })
  
  export const mutations = { // 일반 객체로 만들어야 함
    bye(state) {
      state.name='잘가렴'
    }
  }