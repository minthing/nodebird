<template>
  <v-app> <!-- 꼭 써줘야 함 -->
    <nav>
      <v-toolbar dark color="green">
        <v-toolbar-title>
          <nuxt-link to="/">
            NodeBird🕊
          </nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer> <!-- 빈칸 -->
        <v-toolbar-items>
          <v-text-field label="검색" hide-details prepend-icon="mdi-magnify" /> <!-- input tag / hide-details : 숨어있는 칸을 없앰 -->
          <v-btn text nuxt to="/profile">프로필</v-btn> <!-- nuxt 붙이면 nuxt 링크  / text 클릭 가능한 텍스트필드 -->
          <v-btn text nuxt to="/signup">회원가입</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <v-row no-gutters> <!-- padding 삭제 -->
      <v-col cols="12" md="4"><login-form /></v-col>
      <v-col cols="12" md="8"><nuxt/></v-col> <!-- nuxt로 각 page 불러옴 -->
    </v-row>
  </v-app>
</template>

<script>

import loginForm from '~/components/loginForm.vue';

export default {

components: {
  loginForm,
}

};

</script>



<style scoped>

.v-btn, .v-input{
  display:flex;
  text-align:center;
  align-items: center;
}

a {
display: inline-block;
text-decoration: none;
color: inherit;

}

</style>