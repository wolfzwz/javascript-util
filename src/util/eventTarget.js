/* 
    // var event = new EventTarget();
    // event.addEvents({
    //     alert:function(){
    //         alert('success');
    //     }
    // });
    // event.fireEvents(['alert']);
    // event.removeEvents(['alert']);
*/
export const  EventTarget = function(){
    this.listener = {};
};
EventTarget.prototype = {
    constructor: this,
    // 添加事件
    addEvents: function(obj){
        //obj 为对象{event:listener}
        /* 
            key: 时间名
            value: 回调函数
        */
        obj = typeof obj === 'object' ? obj : {};
        var type;
        for(type in obj){
            // 是否传递事件名
            if(type && typeof obj[type] === 'function'){
                // 是否之前已经绑定过事件，未绑定则监听者初始值为空数组
                if(typeof this.listener[type] === 'undefined'){
                    this.listener[type] = [obj[type]];
                }else{
                    // 如果绑定过事件，则追加
                    this.listener[type].push(obj[type]);
                }
            }
        }
        // 链式调用
        return this;
    },
    // 触发事件
    fireEvents: function(arr){
        //arr 可以为数组['event']
        var that = this;
        if(arr instanceof Array){
            for(var i = 0; i < arr.length; i++){
                fireEvent(arr[i]);
            }
        }
        // 遍历事件的回调函数
        function fireEvent(type){
            if(type && that.listener[type]){
                for(var j = 0; j < that.listener[type].length; j++){
                    that.listener[type][j]();
                }
            }
        }
        return this;
    },
    removeEvents: function(params){
        /* 
            params :['event']|{event:[listener1,listener2]}|{event:listener1}
            参数可以是数组，或者对象
        */
        var that = this;
        // 数组
        if(params instanceof Array){
            for(var i = 0; i < params.length; i++){
                removeEvent(params[i]);
            }
        } else if(typeof params === 'object'){
            // 对象
            for(var type in params){
                removeEvent(type,params[type]);
            }
        }
        function removeEvent(type,key){
            var listeners = that.listener[type];
            if(listeners instanceof Array){
                // key 函数
                if(typeof key === 'function'){
                    for(var ri = 0; ri < listeners.length; ri++){
                        if(listeners[ri] === key){
                            listeners.splice(ri,1);
                            break;
                        }
                    }
                } else if(key instanceof Array){
                    // key 数组
                    for(var ki = 0; ki < key.length; ki++){
                        removeEvent(type,key[ki]);
                    }
                } else{
                    delete that.listener[type];
                }
            }
        };
        return this;
    }
}