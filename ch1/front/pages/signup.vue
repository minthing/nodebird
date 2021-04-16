<template>
<v-container>
  <v-card>
    <v-subheader>Let's get start NodeBird🕊</v-subheader>
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-text-field v-model="email" :rules="emailRules" label="email" type="email" required />
        <v-text-field v-model="password" :rules="passwordRules" label="password" type="password" required />
        <v-text-field v-model="passwordCheck" :rules="passwordCheckRules" label="passwordCheck" type="password" required />
        <v-text-field v-model="nickname" label="nickname" type="text" required />
        <v-checkbox v-model="terms" :rules="checkboxRules" required label="agree"/>
        <v-btn type="submit" :disabled="!valid" color="green" :rules="[v => !!v || '악관에 동의하여 주세요.']">let's NodeBird🕊</v-btn>
      </v-form>
    </v-container>
  </v-card>
</v-container>
</template>

<script>
export default {
  methods:{
    onSubmitForm(){
        if (this.$refs.form.validate()) {
          this.$store.dispatch('user/signUp', {
            nickname: this.nickname,
            email: this.email,
          })
          .then(() => {
            this.$router.push({
            path:'/',
          });
          })
          .catch(() => {
            alert('실패...');
          })
    }
    }
  },
    // layout: 'admin', // 편의를 위한 layout 확장
    head() {
        return {title : '회원가입'}
    },
  data(){
    return {
      valid : false,
      email:'',
      password:'',
      passwordCheck:'',
      nickname:'',
      terms:false,
      emailRules:[
        v => !!v || '이메일은 필수 값입니다.', // 넣었는지 확인
        v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.', //이메일 형식인지 확인하는 정규표현식
      ],
      passwordRules:[
         v => !!v || '비밀번호는 필수 값입니다.',
      ],
      passwordCheckRules:[
        v => !!v || '비밀번호 확인은 필수 값입니다.',
        v => v === this.password || '비밀번호가 일치하지 않습니당.'
      ],
      checkboxRules:[
        v => !!v || '약관에 동의해야 가입 가능합니다.',
      ] 
    }
  }
}
</script>

<style scoped>
</style>
