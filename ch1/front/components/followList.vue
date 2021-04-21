<template>
<v-list-tile>
    <ul>
      <li>
        <li v-for="u in user" :key="u.id">
             <span>{{u.nickname}}</span><v-icon @click="remove(user.id)">mdi-minus-circle-outline</v-icon>
        </li>
    </ul>
</v-list-tile>

</template>

<script>
export default {
    props:{
        user:{
            type:Array,
            required:true
        },
        remove:{
            type:Function,
            required:true
        }
    },
    data(){
        return {
            
        }
    }
}
</script>

<style>

</style>