
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'

Vue.use(Toaster, {timeout: 5000})

Vue.component('message', require('./components/message.vue').default);
//Vue.component('message', require('./components/message.vue'));



const app = new Vue({
    el: '#app',
    data: {
    	message: '',
    		chat:{
    			message:[],
                user:[],
                color:[],
                time:[]
    		},
            typing:'',
            numberOfUsers:0
        },
    watch: {
        message(){
            Echo.private('my_chat')
            .whisper('typing', {
            name: this.message
        });
        }
    },
    methods:{
    	send(){
    		if (this.message.length != 0) {
    			this.chat.message.push(this.message);
                this.chat.color.push('success');
                this.chat.user.push('tú');
                this.chat.time.push(this.getTime());
    			
                axios.post('/send', {
                    message : this.message
                })
                .then(response => {
                console.log(response);
                this.message= ''
                })
                .catch(error => {
                console.log(error);
                });	
    		}
    		
    	},
        getTime(){
            let time = new Date();
            return time.getHours()+':'+time.getMinutes();
        }
    },
    mounted(){
        Echo.private('my_chat')
        .listen('ChatEvent', (e) => {
        this.chat.message.push(e.message);
        this.chat.user.push(e.user);
        this.chat.color.push('warning');
        this.chat.time.push(this.getTime());
        //console.log(e);
    })
        .listenForWhisper('typing', (e) => {
            if (e.name != '') {
                this.typing = 'Escribiendo...'
            }else{
                this.typing = ''
            }
            
    });

    Echo.join(`my_chat`)
    .here((users) => {
        this.numberOfUsers = users.length;
        
    })
    .joining((user) => {
        this.$toaster.success(user.name + 'se ha unido a la sala de chat.');
        this.numberOfUsers +=1;
        
    })
    .leaving((user) => {
        this.$toaster.warning(user.name + 'ha salido de la sala de chat.');
        this.numberOfUsers -=1;
        
    });    
    }
});
