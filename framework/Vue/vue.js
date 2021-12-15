class Watcher{
    constructor(){
        Dep.target = this;
    }
    update(){
        console.log('update~');
    }
}
class Dep{
    constructor(){
        this.subs=[];
    }
    addWatcher(sub){
        this.subs.push(sub);
    }
    notify(){
        this.subs.forEach(sub=>{
            sub.update();
        })
    }
}
class Vue {
    constructor(options){
        this._data = options.data;
        observer(this._data);
        new Watcher();
        console.log(this._data.test);  
        this._data.test="1234" 
        console.log(Dep);
    }

}
function defineReactive(obj,key,value){
    const dep = new Dep();
    console.log(dep.target)
    Object.defineProperty(obj,key,{
        enumerable: true,
        configurable: true,
        get: function getDep(){
            dep.addWatcher(Dep.target);
            return value;
        },
        set: function reactiveSetter(newVal){
            if (newVal == value) return;
            dep.notify();
        }
    })
}
function observer(data){
    if (!data || (typeof data !== 'object')){
        return;
    }
    Object.keys(data).forEach(key=>{
        defineReactive(data,key,data[key]);
    })
}
new Vue({
    data:{
        test:'123'
    }
})

// function patch(oldVnode,vnode,parentElm){
//     if (!oldVnode){
//         addVNode(parentElm,null,vnode,0,vnode.length - 1);
//     }else if (!vnode){
//         removeVnode(parentElm,oldVnode,0,oldVnode.length - 1);
//     }else {
//         if (sameVnode(oldVnode,vnode)){
//             patchNode(oldVnode,vnode);
//         }else {
//             removeVnode(parentElm,oldVnode,0,oldVnode.length - 1);
//             addVNode(parentElm,null,vnode,0,vnode.length - 1);
//         }
//     }
// }