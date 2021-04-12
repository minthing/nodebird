<template>
<v-container> <!-- padding -->
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

</template>

<script>
export default {
  methods:{
    onSubmitForm(){
      this.$refs.form.validate();
      console.log(this.valid);
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