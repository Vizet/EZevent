<template>
	<div class="stat">
		<div class="widget-wrap">
			<div class="widget">
				<div class="event-space">
					<div class="event-count">
						<animate-number
					      from="0" 
					      :to="10" 
					      duration="1500" 
					      easing="easeOutQuad"
					      from-color="#E91E63" 
	  					  to-color="#FFEB3B"
					    ></animate-number>
					</div>
					заявок за 24ч
				</div>
			</div>

			<div class="widget req-count">
				<div class="event-space">
					<div class="event-count">
						<animate-number
					      from="0" 
					      :to="requestCount" 
					      duration="1500" 
					      easing="easeOutQuad"
					      from-color="#E91E63" 
	  					  to-color="#FFEB3B"
					    ></animate-number>
					</div>
					заявок за все время
				</div>
			</div>

			<div class="widget req-percent">
				<div class="event-space">
					<div class="event-count">
						<animate-number
					      from="0" 
					      :to="70" 
					      duration="1500" 
					      easing="easeOutQuad"
					      from-color="#E91E63" 
	  					  to-color="#FFEB3B"
					    ></animate-number>%
					</div>
					мест занято
				</div>
			</div>
		</div>

		<div class="chart-wrap">
			<canvas id="myChart" class="chart-wrap"></canvas>
		</div>

		<button @click="openNewModal">123435</button>

		<!-- Модуль vue form generator. Пока не используется -->
		<!-- <json-form :schema="formSchema"/> -->
		<!-- <vue-form-generator :schema="schema" :model="modelObj" :options="formOptions"></vue-form-generator> -->
	</div>
</template>

<script>
import axios from 'axios'
import chart from 'chart.js'

export default {
	name: 'stat',
	props: ['events'], // должны приходить через Vuex
	data () {
		return {
			requestCount: 0,
			evArr: [],
			dataObj: {
				// labels: [1,2,3,4,5,6],
				datasets: [
					{
					  label: 'Мест занято',
					  fill: true,
					  borderColor: 'RGB(25, 118, 210)',
					  backgroundColor: 'RGBA(25, 118, 210, 0.4)',
					  data: []
					}
				]
			},
			optionObj: { // данные для Chart.js
				scales: {
		            xAxes: [{
		            	type: 'time',
		                time: {
		                    unit: 'day',
		                    displayFormats: {
		                		day: 'DD.MM',
		                		hour: 'hh:mm DD.MM'
		                    }
		                }
		            }],
		             yAxes: [{

		                ticks: {
		                	min: 1,
		                    max: 10

		                }
		            }]
		        },
		        animation: {
		        	duration: 700,
		        },
		        responsive: false,
		        maintainAspectRatio: false
			},
			/*schema: { // Это данные для Vue form generator, мы его пока не используем
	            fields: [{
		                type: "input",
						inputType: "text",
		                label: "ID",
		                model: "id",
		                readonly: true,
		                featured: false,
		                disabled: true
		            }, {
		                type: "input",
		                inputType: "text",
		                label: "Name",
		                model: "name",
		                readonly: false,
		                featured: true,
		                required: true,
		                disabled: false,
		                placeholder: "User's name",
		                validator: VueFormGenerator.validators.string
		            }, {
		                type: "input",
		                inputType: "password",
		                label: "Password",
		                model: "password",
		                min: 6,
		                required: true,
		                hint: "Minimum 6 characters",
		                validator: VueFormGenerator.validators.string
		            }, {
		                type: "input",
		                inputType: "number",
		                label: "Age",
		                model: "age",
		                min: 18,
		                validator: VueFormGenerator.validators.number
		            }, {
		                type: "input",
										inputType: "email",
		                label: "E-mail",
		                model: "email",
		                placeholder: "User's e-mail address",
		                validator: VueFormGenerator.validators.email
		            }, {
		                type: "checklist",
		                label: "Skills",
		                model: "skills",
		                multi: true,
		                required: true,
		                multiSelect: true,
		                values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"]
		            }, {
		               type: "switch",
		                label: "Status",
		                model: "status",
		                multi: true,
		                readonly: false,
		                featured: false,
		                disabled: false,
		                default: true,
						textOn: "Active",
						textOff: "Inactive"
		            }
	            ]
	        },
	        fields: ['name', 'email','birthdate','nickname','gender','__slot:actions'],
	  		modelObj: {
	            id: 1,
	            name: "John Doe",
	            password: "J0hnD03!x4",
	            age: 35,
	            skills: ["Javascript", "VueJS"],
	            email: "john.doe@gmail.com",
	            status: true
	        },
	        formOptions: {
	            validateAfterLoad: true,
	            validateAfterChanged: true
	        }*/

	  	}
	},
	created: function(){
		/* Оригинальный кусок с запросом к СДО */
		/*axios({
			method:'get',
			url: 'https://10.8.153.109/test_folder/EZ/getRequestInfo.php',
			params: {groupId: 1}
		})
		.then(response => {

			var tempRequestArr = response.data;

			tempRequestArr.forEach(el => el.requestDate = new Date(el.requestDate.replace(" ", "T")))
			this.evArr = tempRequestArr;
			
			// считаем общее количество заявок
			this.requestCount = tempRequestArr.length;

			

			var tempDataArr = []
			this.evArr.forEach(function(el, i){
				tempDataArr.push({
					x: el.requestDate,
					y: i+1
				});
			});
			this.dataObj.datasets[0].data = tempDataArr


			var maxPlaces = 0
			this.$root.events.forEach(el => maxPlaces+=el.userLimit)
			this.optionObj.scales.yAxes[0].ticks.max = this.requestCount;


			var ctx = document.getElementById("myChart").getContext('2d');
			var myChart = new Chart(ctx, {
			    type: 'line',
			    data: this.dataObj,
			    options: this.optionObj
			});
		})*/	
	},
	mounted: function(){
		/* Фальшивый массив данных, который мы бы получили при запросе к СДО и его обработка */
		var responseData = JSON.parse('[{"id":1,"eventId":1,"userId":1,"requestDate":"2018-02-05 14:29:13","approved":0},{"id":2,"eventId":1,"userId":2,"requestDate":"2018-02-06 00:00:00","approved":0},{"id":3,"eventId":1,"userId":3,"requestDate":"2018-02-07 21:29:33","approved":0},{"id":4,"eventId":2,"userId":21,"requestDate":"2018-02-08 14:29:39","approved":0},{"id":5,"eventId":2,"userId":22,"requestDate":"2018-02-09 14:30:12","approved":0},{"id":6,"eventId":1,"userId":333,"requestDate":"2018-02-10 14:30:47","approved":0},{"id":93,"eventId":1,"userId":0,"requestDate":"2018-03-13 16:17:13","approved":0}]');

		var tempRequestArr = responseData;

		tempRequestArr.forEach(el => el.requestDate = new Date(el.requestDate.replace(" ", "T")))
		this.evArr = tempRequestArr;
		
		// считаем общее количество заявок
		this.requestCount = tempRequestArr.length;

		

		var tempDataArr = []
		this.evArr.forEach(function(el, i){
			tempDataArr.push({
				x: el.requestDate,
				y: i+1
			});
		});
		this.dataObj.datasets[0].data = tempDataArr


		var maxPlaces = 0
		this.events.forEach(el => maxPlaces+=el.userLimit)
		this.optionObj.scales.yAxes[0].ticks.max = this.requestCount;


		var ctx = document.getElementById("myChart").getContext('2d');
		var myChart = new Chart(ctx, {
		    type: 'line',
		    data: this.dataObj,
		    options: this.optionObj
		});
	},
	methods: {
		// Открыть модалку. Vuedals пока не подключен
		openNewModal() {
            this.$vuedals.open({
                title: 'Cutie',

                component: {
                    name: 'inside-modal',

                    template: `<div>Im a cute modal</div>`
                }
            })
        },
        // Функция модуля animate number, добавляющая дробные промежутки
        /*formatter: function (num) {
	        return num.toFixed(2)
	    },*/
	    startAnimate: function () {
	        this.$refs.myNum.start()
	    }	 
	}
}
</script>

<style scoped>
/*
  Стили виджетов со статистикой
*/

.widget-wrap {
	display: flex;	
	justify-content: space-between;
	width: 67%;
	margin: auto;
}

.widget {
	background: #fff;
	box-shadow: 0 4px 70px -18px #707070;
	margin-bottom: 1.875rem;
	flex: 0 0 290px;
	padding: 1.5625rem;
	box-sizing: border-box;
	font-family: "Source Sans Pro",sans-serif;
	color: #444;
}

.widget.req-count {
	background-color: #e34a4a;
	color: white;
}

.widget.req-percent {
	background-color: #4ab2e3;
	color: white;
}

/*
  Стили обёртки
*/

.stat {
	padding: 32px 16px 16px 16px;
}

/* Что это за стили? */
/*.req-wrap { 
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	padding: 0 16px;	
	color: white;
}


.req-wrap .number-req {	
	display: flex;
	flex-direction: column;
	text-align: center;
}

.req-wrap .number-req .number {	
	font-size: 50px;
	line-height: 1em;
}

.req-wrap.number-req .label {	
	position: relative;
	top: -8px;
}

.req-wrap .progress-wrap {	
	align-self: center;
	padding: 10px 0px;
}

.req-wrap .req-percent {
	font-size: 16px;
	font-weight: bold;
	position: relative;
	right: -4px;
}*/

/*
  Стили графика
*/

.chart-wrap {
	position: relative;
	width: 950px;
	margin: auto;
	margin-top: 16px;	
}
</style>