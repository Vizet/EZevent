<template>
  <div id="app">
    <div class='header-block'>
      <div class='title-icon'></div>
      <div class='title-text'>
        <div class='title'>EZ EVENT</div>
        <div class='title-desc'>система записи на мероприятия</div>
      </div>
      
    </div>

    <div class="side-menu">
      <router-link class="menu-icon calendar" to="/"></router-link>
      <router-link class="menu-icon analysis" to="/stat"></router-link>
      <router-link class="menu-icon admin" to="/form"></router-link>
    </div>

    <div class="content-block">
      <router-view :events="events"/>
    </div>

    <!-- Это плагин для создания модальных окон, пока не подключал -->
    <!-- <vuedals></vuedals> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      dno: 'rak',
      arr: [1, 2],
      events: [],
      requests: [],
      eventFormFlag: false,
      statFlag: false,
      reqStat: [] // хранилище для данных статистики
    }
  },
  mounted: function(){
      this.getGroupData();
  },
  methods: {
    me: function(){
      this.arr.push('');
    },
    userLogin: function(){
      axios({
        method:'get',
        url: 'https://10.8.153.109/test_folder/EZ/1.php',
        params: {
          login: 'test_kus',
          pass: '620914Qweasd#'
        }
      }).then(function(response) {
        console.log(response.data)
      });
    },
    getGroupData: function() {
      /* Фальшивый массив данных, который мы бы получили при запросе к СДО и его обработка */
      var responseData = JSON.parse('{"name":"Meropriyatie IQOS","rawHtml":"Zdes opisanie translitom potomu chto u menya problemy s kodirovkoy","events":[{"id":1,"groupId":1,"name":"IQOS +100500","description":"\u042d\u0442\u043e \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435","userLimit":10,"limitGuestsPerUser":1,"date":"10.02.2018 10:00","place":"\u0413\u041a \u043a\u043e\u043d\u0444\u0435\u0440\u0435\u043d\u0446 \u0437\u0430\u043b","currentNum":4},{"id":2,"groupId":1,"name":"IQOS 2","description":"\u0415\u0449\u0435 \u043e\u0434\u043d\u043e \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435","userLimit":15,"limitGuestsPerUser":1,"date":"10.02.2018 15:00","place":"\u0413\u041a \u043a\u043e\u043d\u0444\u0435\u0440\u0435\u043d\u0446 \u0437\u0430\u043b","currentNum":2},{"id":3,"groupId":1,"name":123,"description":"","userLimit":11,"limitGuestsPerUser":0,"date":"","place":"","currentNum":0},{"id":4,"groupId":1,"name":"sfdfsdf","description":"","userLimit":12,"limitGuestsPerUser":0,"date":"","place":"","currentNum":0},{"id":5,"groupId":1,"name":"ersdfsdf","description":"","userLimit":13,"limitGuestsPerUser":0,"date":"","place":"","currentNum":0},{"id":8,"groupId":1,"name":"\u041c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u0435","description":"\u0434\u043d\u043e","userLimit":0,"limitGuestsPerUser":0,"date":"\u0434\u043d\u043e","place":"\u0412\u0441\u0435\u0433\u0434\u0430","currentNum":0},{"id":9,"groupId":1,"name":"\u0434\u043d\u043e \u043d\u0430 \u0434\u043d\u0435","description":"","userLimit":0,"limitGuestsPerUser":0,"date":"","place":"","currentNum":0}],"requests":[]}');
      // console.log(responseData);

      this.events = responseData.events.map(el => {
        // ставим флаг если у юзера есть заявка на это мероприятие
        el.haveRequest = responseData.requests.some(req => req.eventId == el.id)
        return el
      })

      
      this.requests = responseData.requests

      /* Оригинальный кусок с запросом к СДО */
      /*axios({
        method:'get',
        url: 'https://10.8.153.109/test_folder/EZ/getGroupInfo.php',
        params: {
          groupId: 1
        }
      }).then(response => {
        console.log(response.data)

        this.events = response.data.events.map(el => {
          // ставим флаг если у юзера есть заявка на это мероприятие
          el.haveRequest = response.data.requests.some(req => req.eventId == el.id)
          return el
        })

        
        this.requests = response.data.requests
      })*/
    }
  }
}
</script>

<style scoped>
.header-block{
  /*! color: #eee; */
  /*! text-align: center; */
  height: 64px;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);
  z-index: 99;
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
}

.title-icon{
  width: 42px;
  height: 42px;
  background-size: 100%;
  background-image: url('./assets/tickets.svg');
  margin: 8px;
  margin-right: 16px;
  margin-left: 16px;
}

.title{
  font-size: 16.2px;
  font-weight: bold;
  font-family: "Roboto", sans-serif, Helvetica, Arial, sans-serif;
}

.title-desc{
  font-size: 14px;
}

.content-block{
  padding: 64px 0 0 64px;
}

/*
  Стили бокового меню
*/

.side-menu{
  width: 64px;
  z-index: 2;
  height: 100%;
  background: #2b323a;
  position: fixed;
  transition: all 0.3s;
  /*! box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.19), 8px 0px 10px rgba(0, 0, 0, 0.23); */
  text-align: center;
  overflow: auto;
  top: 64px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.side-menu .menu-icon{
  width: 32px;
  height: 32px;
  background-size: 100%;
  /*! padding: 8px; */
  margin: 16px 0;
  transition: .2s ease;
  cursor: pointer;
}

.side-menu .menu-icon:hover{
  transform: scale(1.2);
}
</style>
