<template>
<v-container>
    <div>
    <post-card/>
    <post-card/>
    <post-card/>
    <post-card/>
  </div>
</v-container>
</template>

<script>
import postCard from '~/components/postCard.vue';
export default {
  components:{
    postCard
},
      head() {
        return {title : '메인페이지'}
    },
  data(){
    return {
      name : 'Nuxt.js',
    }
  }
}
</script>

<style scoped>
</style>
