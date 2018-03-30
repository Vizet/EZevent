<template>
  <!-- Обёртка для карточек мероприятий -->
  <div class="eventWrap">
    <event-card v-for="el in events" :key="el.id" :event="el"></event-card>
  </div>
</template>

<script>
import eventCard from '@/components/eventPage/eventCard'

export default {
  name: 'eventPageMain',
  components: {
    eventCard
  },
  props: ['events'], // должны приходить через Vuex
  data () {
    return {

    }
  }
}
</script>

<style scoped>
/*
  Стили обёртки
*/

.eventWrap {
  display: flex;
  justify-content: center;
  margin: auto;
  flex-wrap: wrap;
  padding-right: 32px;
}
</style>