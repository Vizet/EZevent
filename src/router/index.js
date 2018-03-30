import Vue from 'vue'
import Router from 'vue-router'
import eventPageMain from '@/components/eventPage/eventPageMain'
import stat from '@/components/statPage/stat'
import eventForm from '@/components/eventFormPage/eventForm'
import animateNumber from 'vue-animate-number'

Vue.use(animateNumber)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'eventPageMain',
      component: eventPageMain
    },
    {
      path: '/stat',
      name: 'stat',
      component: stat
    },
    {
      path: '/form',
      name: 'eventForm',
      component: eventForm
    }
  ]
})
