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
    },
    hasMorePosts(){
      return this.$store.state.posts.hasMorePost;
    }
  },
  fetch({store}){ // 처음 시작할 때 데이터 붙여둠
  store.dispatch('posts/loadPosts');
  },
  mounted(){ // mounted 만든 건 반드시 beforeDestroy에서 제거해 줘야 함 -> 메모리 누수 때문
    window.addEventListener('scroll', this.onScroll);
    // window는 created에서 못씀
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.onScroll);
  },
    methods:{
    onScroll(){
      console.log('scroll'); 
      if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 200){
        if(this.hasMorePosts){
          this.$store.dispatch('posts/loadPosts');
        }
      }
    }
  },
}
</script>

<style scoped>
</style>
