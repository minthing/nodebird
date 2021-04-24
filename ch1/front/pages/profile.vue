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
      <follow-list :user="followingList" :remove="removeFollowing" />
      <v-btn @click="loadMoreFollowings" style="width:100%" dark color="blue" v-if="hasMoreFollowing">more</v-btn>
    </v-card>
    <v-card>
      <v-subheader>My followers</v-subheader>
      <follow-list :user="followerList" :remove="removeFollower"/>
      <v-btn @click="loadMoreFollowers" style="width:100%" dark color="blue" v-if="hasMoreFollower">more</v-btn>
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
  computed:{
    followerList(){
      return this.$store.state.user.followerList
    },
    followingList(){
      return this.$store.state.user.followingList
    },
    hasMoreFollowing(){
      return this.$store.state.user.hasMoreFollowing
    },
    hasMoreFollower(){
      return this.$store.state.user.hasMoreFollower
    }
  },
  middleware:'authenticated',
  methods:{
    onChangeNickname(){
      this.$store.dispatch('user/changeNickname',{
        nickname:this.nickname
      })
    },
    removeFollowing(id){
      this.$store.dispatch('user/removeFollowing',{
        id:id
      })
    },
    removeFollower(id){
      this.$store.dispatch('user/removeFollower',{
        id:id
      })
    },
    loadMoreFollowers() {
      this.$store.dispatch('user/loadFollowers');
    },
    loadMoreFollowings() {
      this.$store.dispatch('user/loadFollowings');
    },
  },
    fetch({ store }) {
    store.dispatch('user/loadFollowers');
    store.dispatch('user/loadFollowings');
  },
}
</script>

<style scoped>
</style>
