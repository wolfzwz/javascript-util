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
var EventTarget = function(){
    this.listener = {};
};
EventTarget.prototype = {
    constructor: this,
    addEvents: function(obj){
        //obj {event:listener}
        obj = typeof obj === 'object' ? obj : {};
        var type;
        for(type in obj){
            if(type && typeof obj[type] === 'function'){
                if(typeof this.listener[type] === 'undefined'){
                    this.listener[type] = [obj[type]];
                }else{
                    this.listener[type].push(obj[type]);
                }
            }
        }
        return this;
    },
    fireEvents: function(arr){
        //arr ['event']
        var that = this;
        if(arr instanceof Array){
            for(var i = 0; i < arr.length; i++){
                fireEvent(arr[i]);
            }
        }
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
        //params ['event'] {event:[listener1,listener2]} {event:listener1}
        var that = this;
        if(params instanceof Array){
            for(var i = 0; i < params.length; i++){
                removeEvent(params[i]);
            }
        } else if(typeof params === 'object'){
            for(var type in params){
                removeEvent(type,params[type]);
            }
        }
        function removeEvent(type,key){
            var listeners = that.listener[type];
            if(listeners instanceof Array){
                if(typeof key === 'function'){
                    for(var ri = 0; ri < listeners.length; ri++){
                        if(listeners[ri] === key){
                            listeners.splice(ri,1);
                            break;
                        }
                    }
                } else if(key instanceof Array){
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
