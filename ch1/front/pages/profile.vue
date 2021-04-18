<template>
<div>
  <v-container>
    <v-card>
      <v-container>
        <v-subheader>My profile</v-subheader>
      </v-container>
      <v-container>
      <v-form v-model="valid" @submit.prevent="onChangeNickname">
        <v-text-field type="text" v-model="nickname" :rules="nickanmeRules" label="change your nickname" />
        <v-btn type="submint" color="green">confirm</v-btn>
      </v-form>
      </v-container>
    </v-card>
    <v-card>
      <v-subheader>My followings</v-subheader>
      <follow-list />
    </v-card>
    <v-card>
      <v-subheader>My followers</v-subheader>
      <follow-list />
    </v-card>
  </v-container>
</div>
</template>

<script>
import followList from '~/components/followList.vue'
export default {
  components: { followList },
        head() {
        return {title : '프로필'}
    },
  data(){
    return {
      name : 'Nuxt.js',
      valid:false,
      nicknameRules:[
        v => !!v || '닉네임 입력 좀',
      ]
    }
  },
  methods:{
    onChangeNickname(){
      this.$store.dispatch('user/changeNickname',{
        nickname:this.nickname
      })
    }
  }
}
</script>

<style scoped>
</style>
