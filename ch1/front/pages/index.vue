<template>
<v-container>
  <post-form v-if="me" />
    <div>
      <post-card v-for="post in mainPosts" :key="post.id" :post="post" />
  </div>
</v-container>
</template>

<script>
import postCard from '~/components/postCard.vue';
import postForm from '~/components/postForm.vue';
export default {
  components:{
    postCard,
    postForm
},
  head() {
    return {title : '메인페이지'}
  },
  data(){
    return {
      name : 'Nuxt.js',
    }
  },
  computed:{
    me(){
      return this.$store.state.user.me;
    },
    mainPosts(){
      return this.$store.state.posts.mainPosts;
    }
  }
}
</script>

<style scoped>
</style>
