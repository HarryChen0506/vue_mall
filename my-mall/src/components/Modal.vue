<template>
  <div class="">
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
        <div class="md-modal-inner">
            <div class="md-top">
                <div class="md-title">
                     <slot name="md-title"></slot>
                </div>               
                <button class="md-close" @click="closeModal()">Close</button>
            </div>
            <div class="md-content">
                <div class="confirm-tips">
                    <slot name="md-content"></slot>
                </div>                
                <div class="login-wrap">
                    <slot name="btn-group"></slot>                    
                </div>
            </div>
        </div>
    </div>
    <div class="md-overlay" v-if="mdShow" @click="closeModal()"></div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>

<script>
export default {
  name: 'modal',
  props: ['mdShow'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
      closeModal: function (){
        this.$emit('close');
      }
  }
}
</script>

