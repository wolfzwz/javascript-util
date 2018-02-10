eventUtil = {
    // add event
    addHandler: function(el,type,handler){
        if(ele.addEventListener){
            ele.addEventListener(type,handler,false);
        }else if(ele.attachEvent){
            // ie
            ele.attachEvent('on'+type,handler);
        }else{
            // DOM0
            ele['on'+type] = handler;
        }
    },
    // remove listener
    removeHandler: function(el,type,handler){
        if(ele.removeEventListener){
            ele.removeEventListener(type,handler,false);
        }else if(ele.attachEvent){
            // ie
            ele.detachEvent('on'+type,handler);
        }else{
            // DOM0
            ele['on'+type] = null;
        }
    },
    // get event
    getEvent: function(event){
        // window.event ie/DOM0
        return event ? event : window.event;
    },
    // get target
    getTarget: function(event){
        // ie srcElement
        return event.target || event.srcElement;
    },
    // prevent default
    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            // ie
            event.returnValue = false;
        }
    },
    // stop propgation
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            // ie
            event.cancelBubble = true;
        }
    },
    // 鼠标 button属性
    getButton: function(event){
        if(document.implementation.hasFeature("MouseEvents","2.0")){
            return event.button;
        }else{
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    }
    // get wheel detail
    ,getwheeldelta: function(){
        if(event.wheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5
                ? -event.wheelDelta : event.wheelDelta    
            );
        }else{
            return -event.Detail * 40;
        }
    },
    getCharCode: function(event){
        if(typeof event.charCode == 'number'){
            return event.charCode;
        }else{
            // <=ie8 / opera
            return event.keyCode;
        }
    },
    getClipboardText: function(){
        var clipboardData = (ev.clipboardData || window.clipboardData);
        return clipboardData.getData('text');
    },
    setClipboardText: function(ev,value){
        if(ev.clipboardData){
            return ev.clipboardData.setData('text/plain',value);
        }else if(window.clipboardData){
            return window.clipboardData.setData('text',value);
        }
    },
    getSlectedOptions: function(select){
        //select 为select元素
        var result = new Array();
        var option = null;
        for(var i = 0,len = select.options.length; i++){
            option = select.options[i];
            if(option.selected){
                result.push(option);
            }
        }
        return result;
    },
    //序列化表单
    serialize: function(form){
        // <form action="">
        //     <input type="text" value="1">
        //     <input type="checkbox" name="12"/>
        // </form>
        var parts = [],
        field = null,
        i,
        len,
        j,
        optLen,
        option,
        optValue;
        for(i = 0,len = form.elements.length; i < len;i++){
            field = form.elements[i];
            switch(field.type){
                case 'select-one':
                case 'select-mutiple':
                    if(field.name.length){
                        for(j = 0,optLen = field.options.length; j < optLen; j++){
                            option = field.options[j];
                            if(option.selected){
                                optValue = '';
                                if(option.hasAttribute){
                                    optValue = (option.hasAttribute(value) ?
                                        option.value : option.text
                                    );
                                }else{
                                    optValue = (option.attributes['value'].specified ?
                                        option.value : option.text
                                    );
                                }
                                parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue));
                            }
                        }
                    }
                    break;
                case undefined:
                case 'file':
                case 'submit':
                case 'reset':
                case 'button':
                    break;
                case 'radio':
                case 'checkbox':
                    if(!field.checked){
                        break;
                    }
                default:
                    if(field.name.length){
                        parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
                    }
            }
            return parts.join('&');
        }
    },
    //处理查询字符串函数
    addQueryStringArg: function(url,name,value){
        //url
        //name 参数名
        //value 参数值
        if(url.indexof('?') === -1){
            url += '?';
        }else{
            url += '&'； 
        }
        url += encodeURIComponent(name) + '=' +encodeURIComponent(value);
        return url;
    },
    //创建xhr
    createXhr: function(){
        if(typeof XMLHttpRequest != 'undefined'){
            return new XMLHttpRequest();
        }else if(typeof AxtiveXObject != 'undefined'){
            //<=ie7
            if(typeof arguments.callee.activeXString != 'string'){
                var versions = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0',
                    'MSXML2.XMLHttp'
                ],i,len;
                for(i = 0,len = versions.length;i < len; i++){
                    try{
                        new AxtiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch(ex){
                        
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }else{
            throw new Error("No XHR object available");
        }
    }
}