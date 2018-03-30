<template>
	<!-- Форма редактирования мероприятий -->
	<div class="event-form">
		<!-- Добавить мероприятие -->
		<div class="add-btn-wrap">
			<div class="add-btn" @click="addEvent"></div>
		</div>

		<!-- Обёртка для полей ввода -->
		<div class="card-wrap">
			<div class="event-card userCard" v-for="(el, index) in events">
				<text-field label="Название" v-model="el.name"/>
				<text-field label="Описание" v-model="el.description"/>
				<text-field label="Лимит людей" v-model="el.userLimit"/>
				<text-field label="Гостей на 1 человека" v-model="el.limitGuestsPerUser"/>
				<text-field label="Место" v-model="el.place"/>
				<text-field label="Дата" v-model="el.date"/>

				<div class="close-btn" @click="removeEvent(index)"></div>
			</div>
		</div>

		<!-- Кнопка отправить форму -->
		<button @click="sendEventData">Отправить</button>		
	</div>
	
</template>

<script>
import axios from 'axios'
import textField from '@/components/eventFormPage/textField'

export default {
	name: 'eventForm',
	props: ['events'], // должны приходить через Vuex
	components: {
	    textField: textField
	},
	data () {
		return {
			//loadedFlag: false, // Не используется?
		}
	},
	computed: {
		/* Не используется в этом компоненте. Удалить? */
		/*freeSpace: function(){
			var free = this.event.userLimit - this.event.currentNum;
			return  free > 0 ? free : 0;
		}*/
	},
	created: function() {

	},
	methods: {
		// добавить мероприятие
		addEvent: function(){
			this.$root.events.push({
				name: '',
				description: '',
				userLimit: '',
				limitGuestsPerUser: '',
				place: '',
				date: '',
			});
		},

		// удалить мероприятие
		removeEvent: function(index){
			if(confirm('Удалить мероприятие? Изменения будут применены только после сохранения')){
				this.$root.events.splice(index, 1)
			}
			
		},
		sendEventData:function(){
			var that = this;

			axios({
                method:'get',
                url: 'https://10.8.153.109/test_folder/EZ/updateGroup.php?groupId=1',
                params: {
                	groupId: '1',
                	groupJson: JSON.stringify(this.$root.events)
                }
            })
            .then(function(response) {
                alert(response.data);
                that.$root.getGroupData();
            });
		}
	}
}
</script>

<style scoped>
/*
  Стили обёрток
*/

.card-wrap {
	display: flex;
	flex-wrap: wrap;
}

.add-btn-wrap {
	width: auto !important;
}
</style>