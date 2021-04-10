#Vue.js + Node.js로 트위터 클론하기 🕊


### daily progress
***
##### 210405(화)
* 로컬에 vue와 nuxt 설치하기
* 참고자료 : [vue.js](https://kr.vuejs.org/v2/guide/index.html) | [nuxt.js](https://ko.nuxtjs.org/)

##### 210408(목)
* 역시 atom보다 vscode가 편하다. vue 스타일 템플릿 찾느라 하루를 날렸는데...
* 폴더 구조와 경로에 따라 페이지 트리 생성
* pages나 layouts와 같은 폴더명은 디폴트임
* nuxt는 개별적인 페이지로 이루어져 있음 (code spliting)/ vue-router는 실제로는 하나의 페이지인데 각 url마다 컴포넌트 바꿔치기를 함(수백만개의 페이지를 전부 로딩해야 함 -> 성능저하)

```vue.js
<nuxt-link to="/signup">Signup</nuxt-link> //vue-router에서 router-link와 같음
```

* 페이지별로 공통되는 요소는 `layouts/defalut.vue`에 몰아넣고 아래애 `<nuxt />`를 통해 개별 페이지 내용을 불러온다.

```vue.js
<template> // default.vue 안의 내용
  <div>
    <nav>
    <nuxt-link to="/">Home</nuxt-link> // 다음 페이지 미리 로딩하는 기능을 포함 router-link 말고 이거 사용
    <nuxt-link to="/profile">Profile</nuxt-link>
    <nuxt-link to="/signup">Signup</nuxt-link>
    </nav>
    <nuxt /> // router-view와 같음
  </div>
</template>
```

##### 210411(토)
* mdi-icon : https://materialdesignicons.com/