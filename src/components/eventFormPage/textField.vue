<template>
  <div class='mfield'>
      <input class="mi fio" type="text" :value='value' @input='tfInput($event.target.value)' required> 
      <label class="mi-label">{{label}}</label>
      <div class="bar"></div>
  </div>
</template>

<script>
  export default {
    name: 'textField',
    props: ['label', 'value'],
    data: function () {
      return {

      }
    },
    methods: {
      tfInput: function(val){
        this.$emit('input', val);
      }
    },
  }
</script>