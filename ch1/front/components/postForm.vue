<template>
<v-card>
    <v-container>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-textarea
            outlined
            auto-grow
            clearable
            v-model="content"
            label="nodebird에게 알려 줄 새로운 소식이 있나요?"
            :hide-details="hideDetails"
            :success-messages="successMessages"
            :success="success"
            :rules="isEmpty"
            @input = "onChangeTextarea"
            />
            <!-- 버튼이 v-form 안에 들어가 있어야함 -->
          <v-btn type="submit" color="green" absolute right>let's 짹짹🕊</v-btn>
          <v-btn>upload images</v-btn>
        </v-form>
    </v-container>
</v-card>
</template>

<script>
import {mapState} from 'vuex';
export default {
    data() {
        return{
            valid:false,
            hideDetails:false,
            successMessages:'',
            success:false,
            content:'',
            isEmpty:[
            text => !!text.trim() || '내용을 입력해 주세요',
            ]
        }
    },
    computed:{ // 매핑해줌
        ...mapState('user', ['me']),
    },
    methods:{
        onChangeTextarea(){
            this.hideDetails=true,
            this.success=false, // 초기화
            this.successMessages=''
        },
        onSubmitForm(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('posts/add',{
                    content:this.content,
                    User:{
                      nickname:this.me.nickname
                    },
                    Comments:[],
                    Images:[],
                    id: Date.now(),
                    createdAt:Date.now()
                })
                .then(() => {
                    this.hideDetails=false;
                    this.success=true;
                    this.successMessages = '게시글 전송 선공!';
                })
                .catch(() => {

                })
            }
        }
    }
}
</script>

<style>

</style>