<template>
<v-container v-if="!me"> <!-- padding / user state me가 없으면! 보임 -->
    <v-card>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-container>
                <v-text-field label="email" :rules="emailRules" type="email" required />
                <v-text-field label="password" :rules="passwordRules" type="password" required />
                <v-btn color="green" type="submit" :disabled="!valid">login</v-btn>
                <v-btn nuxt to="/signup">sign up</v-btn>
            </v-container>
        </v-form>
    </v-card>
</v-container>
<v-container v-else>
  <v-card>
    {{me.nickname}}님, 로그인 되었습니당 🕊
  </v-card>
  <v-btn @click="onLogOut">로그아웃</v-btn>
</v-container>
</template>
<script>
export default {
  methods:{
    onSubmitForm(){ // action은 비동기 이므로 위와 아래의 실행완료 시점이 다를 수 있음
        if (this.$refs.form.validate()) {
          this.$store.dispatch('user/logIn', {
            nickname: 'minthing',
            email: this.email,
          });
      }
    },
    onLogOut(){
      this.$store.dispatch('user/logOut');
    }
  },
  computed:{ // store 데이터 불러옴
  me(){
    return this.$store.state.user.me
  }
  },
  data(){
    return {
      valid : false,
      email:'',
      password:'',
      terms:false,
      emailRules:[
        v => !!v || '이메일은 필수 값입니다.', // 넣었는지 확인
        v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.', //이메일 형식인지 확인하는 정규표현식
      ],
      passwordRules:[
         v => !!v || '비밀번호는 필수 값입니다.',
      ]
    }
  }
}
</script>

<style>

</style>