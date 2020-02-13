import Vue from 'vue';
console.log($)
import '@/assets/js/cc'
import Index from 'components/index'
new Vue({
    components: {
        'test-vue': Index
    },
    data() {
        return {
            test: '123'
        }
    },
    methods: {
        getJs() {
            console.log(123)
            import('../../assets/source/a').then(res => {
                console.log(res);
            })
        }
    }
}).$mount('#app');
console.log(123222);
console.log(222);