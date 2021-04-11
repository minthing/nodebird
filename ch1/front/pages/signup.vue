<template>
<v-container>
  <v-card>
    <v-subheader>Let's get start NodeBird🕊</v-subheader>
    <v-container>
      <v-form>
        <v-text-field label="email" type="email" required />
        <v-text-field label="password" type="password" required />
        <v-text-field label="password check" type="password" required />
        <v-text-field label="nickname" type="text" required />
        <v-checkbox required label="agree"/>
        <v-btn type="submit" color="green">let's NodeBird🕊</v-btn>
      </v-form>
    </v-container>
  </v-card>
</v-container>
</template>

<script>
export default {
    // layout: 'admin', // 편의를 위한 layout 확장
    head() {
        return {title : '회원가입'}
    },
  data(){
    return {
      name : 'sign up',
    }
  }
}
</script>

<style scoped>
</style>
