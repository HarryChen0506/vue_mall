<template>
  <div v-if="mdShow">
    <div class="md-modal modal-msg md-modal-transition md-show">
        <div class="md-modal-inner">
            <div class="md-top">
                <div class="md-title">
                     <div>{{title}}</div>
                </div>               
                <button class="md-close" @click="closeModal()">Close</button>
            </div>
            <div class="md-content">
                <div class="">
                    {{content}}
                </div>                
                <div class="login-wrap">
                    <a href="javascript:;" class="btn btn--m" @click="next()">确定</a>           
                    <a href="javascript:;" class="btn btn--m" @click="close()">取消</a>           
                </div>
            </div>
        </div>
    </div>
    <div class="md-overlay" @click="closeModal()"></div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>

<script>
export default  {
    name: 'modalConfirm',
    props: [],
    data () {
        return {
        msg: 'Welcome to Your Vue.js App',
        title: '标题',
        content: '内容',
        mdShow: false
        }
    },
    methods: {        
        init: function (){
            this.mdShow = true;
        },
        confirm: function (opts){
            this.title = opts.title;
            this.content = opts.content;
            this.init();
            this.promise = new Promise((resolve, reject) => { 
                this.resolve = resolve; 
                this.reject = reject; 
            }); 
            return this.promise; 
        },
        next: function (){
            this.resolve();
            this.closeModal();
        },
        close: function (){
            this.reject(); 
            this.closeModal();
        },
        closeModal: function (){
            this.mdShow = false;
        }
    }
};
</script>

