import '@/assets/css/public.css'
import '@/assets/less/index.less'
import logo from '@/assets/image/logo.png'
import '@/assets/js/cc'
import Vue from 'vue';
new Vue().$mount("#app");
console.log(logo);
console.log('hello');
console.log($)
// console.log(add);
let image = new Image();

image.src = logo;
document.querySelector("#app").appendChild(image);
let fn = () => {

    console.log("这是ES6");
}
fn();
class Person {
    name = 'hello';
    age = 0;
    // constructor(age) {
    //     this.age = age
    // }
}
function * gen() {
    yield 1
}
console.log(gen().next());
const p = new Person("18");
console.log("aaa".includes("a"))
console.log(p.age);
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/user', true);
xhr.onload = function () {
    console.log(xhr.response);
}
xhr.send();
console.log(ads)