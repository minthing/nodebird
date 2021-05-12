<template>
<v-container v-if="!me"> <!-- padding / user state me가 없으면! 보임 -->
    <v-card>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-container>
              <!-- https://joshua1988.github.io/web-development/vuejs/v-model-usage/ -->
                <v-text-field v-model="email" label="email" :rules="emailRules" type="email" required />
                <v-text-field v-model="password" label="password" :rules="passwordRules" type="password" required />
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
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
        ],
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.',
        ],
      };
    },
    computed: {
      me() {
        return this.$store.state.user.me;
      },
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('user/logIn', {
            email: this.email,
            password: this.password,
          });
        }
      },
      onLogOut() {
        this.$store.dispatch('user/logOut');
      },
    },
  };
</script>

<style>

</style>