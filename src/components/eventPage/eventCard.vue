<template>
	<!-- Карточка события -->
	<div class="event" :class="{active: event.haveRequest}">
		<!-- Название события -->
		<div class="event-head">
			{{event.name}}
		</div>

		<!-- Информация о событии -->
		<div class="event-body" :class="{active: !event.haveRequest}">
			<div class="event-info">
				<div>{{event.place}}</div>
				<div>{{event.date}}</div>
				<div>Всего мест: {{event.userLimit}}</div>
			</div>

			<div class="event-space">
				Осталось
				<div class="event-count">
					<animate-number
				      from="0" 
				      :to="freeSpace" 
				      duration="1500" 
				      easing="easeOutQuad"
				      from-color="#FFEB3B" 
  					  to-color="#E91E63"
				    ></animate-number>
				</div>
				мест
			</div>
		</div>

		<!-- Информация в случае записи на мероприятие -->
		<div v-if="event.haveRequest" class="event-body success" :class="{active: event.haveRequest}">
			<div class="event-info">
				Вы записаны на это мероприятие
				<div class="success icon"></div>
			</div>
			
			<div class="event-info">
				<div>{{event.place}}</div>
				<div>{{event.date}}</div>
			</div>
		</div>

		<!-- Кнопка записаться/отменить запись -->
		<div class="button" @click="changeRequest" :class="{cancel: event.haveRequest}">
			<template v-if="event.haveRequest">отменить запись</template>
			<template v-else @click="sendRequest">Записаться</template>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
		name: 'eventCard',
		props: ['event'], // должны приходить через Vuex
		data () {
			return {
				//loadedFlag: false, // Не использется?
				active: false,
			}
		},
		computed: {
			// Осталось мест
			freeSpace: function(){
				var free = this.event.userLimit - this.event.currentNum;
				return  free > 0 ? free : 0;
			},
		},
		created: function(){
			
		},
		methods: {
			// Изменение статуса записи
			changeRequest: function(){
				// если заявка на мероприятие не создана - создаем
				if(!this.event.haveRequest){
					this.sendRequest()
				}
				// иначе отправляем запрос на удаление
				else{
					this.cancelRequest()
				}
				this.event.haveRequest = !this.event.haveRequest				
			},

			// Записаться
			sendRequest: function(){
				console.log('sendRequest')
				axios({
					method:'get',
					url: 'https://10.8.153.109/test_folder/EZ/changeRequest.php',
					params: {
						eventId: this.event.id,
						mode: 'add'
					}
				})
				.then(response => {
					console.log(response.data)
					this.$root.getGroupData()
				})
			},

			// Отменить запись
			cancelRequest: function(){
				console.log('cancelRequest')
				axios({
					method:'get',
					url: 'https://10.8.153.109/test_folder/EZ/changeRequest.php',
					params: {
						eventId: this.event.id,
						mode: 'remove'
					}
				})
				.then(response => {
					console.log(response.data)
					this.$root.getGroupData();
				})
			},
			/* Функции модуля animate number. Форматтер отключена, она добавляет числам дробную часть */
			/*formatter: function (num) {
		        return num.toFixed(2)
		    },*/

		    startAnimate: function () {
		        this.$refs.myNum.start()
		    }
		}
	};
</script>

<style scoped>
/*
  Стили карточки события
*/

.event {
	display: flex;
	flex-direction: column;
	box-shadow: 0 2px 5px rgba(0,0,0,.3);
	background: white;
	border-radius: 8px;
	position: relative;
	width: 350px;	
	margin: 24px;
	box-sizing: border-box;
	justify-content: space-between;
	transition: transform .5s;
}

.event-head {
	font-size: 37px;
	font-family: Segoe UI;
	text-align: center;
	line-height: 1.8em;
	height: 72px;
	-webkit-user-select: none;
	overflow: hidden;
	border-top-right-radius: 5px;
	border-top-left-radius: 5px;
	width: 100%;
	border-bottom: 1px solid #aaa;
	transition: transform 0s ease .1s;
}


.event-body {
	display: flex;
	padding: 15px 24px 22px 24px;
	box-sizing: border-box;
	justify-content: space-between;
	align-items: center;
}

.event.active {
	transform: rotateY(180deg)
}

.event.active > * {
	transform: rotateY(180deg);
}

.event.active > .event-body:not(.active) {
	backface-visibility: hidden;
	display: none;
}


.event-body.success {
	flex-direction: column;
}

.event-info {
	text-align: center;
}

.button {
	font-size: 22px;
	font-family: Helvetica;
	text-align: center;
	color: #fff;
	background: #645394;
	transition: background .1s;
	cursor: pointer;
	-webkit-user-select: none;
	overflow: hidden;
	border-bottom-right-radius: 5px;
	border-bottom-left-radius: 5px;
	width: 100%;
	text-transform: uppercase;
	padding: 1em 0 1em;
	align-self: flex-end;
}

.button:hover {
	background: #7463A4;
}

.button.disabled {
	background: #607D8B !important;
	cursor: not-allowed;
}

.button.cancel {
	background-color: #FF7043;
	font-style: italic;
	text-transform: none;
}
</style>