<template>
<div>
  signup page
</div>
</template>

<script>
export default {
    layout: 'admin', // 편의를 위한 layout 확장
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
