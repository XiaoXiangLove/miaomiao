import Vue from "vue";
import MessageBox from "../../components/MessageBox";

export let messageBox = (function(){

    let defaults = {      //默认值   外部引用组件时需传入的参数，也是页面中要显示的内容及触发事件执行的方法
        title:"",
        content:"",
        cancel:"",
        ok:"",
        handleCancel : null,
        handleOk : null
    };
    return function (opts){     //配置参数
        for (let attr in opts) {
            defaults[attr] = opts[attr];
        }
        let MyComponent = Vue.extend(MessageBox);
        let vm = new MyComponent({
            el:document.createElement("div"),
            data:{
                title:defaults.title,
                content:defaults.content,
                cancel : defaults.cancel,
                ok : defaults.ok
            },
            methods:{
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild(vm.$el);
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el);
                }
            }
        });
        document.body.appendChild(vm.$el);
    }
})()