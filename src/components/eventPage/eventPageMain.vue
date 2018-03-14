<template>
  <div class='eventWrap'>
    <event-card v-for="el in events" :key="el.id" :event='el'></event-card>
  </div>
</template>

<script>
import eventCard from '@/components/eventPage/eventCard'

export default {
  name: 'eventPageMain',
  components: {
    eventCard: eventCard
  },
  props: ['events'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
.eventWrap{
  display: flex;
  justify-content: center;
  /*! width: -moz-min-content; */
    /*! width: min-content; */
  margin: auto;
  flex-wrap: wrap;
  padding-right: 32px;
}
</style>