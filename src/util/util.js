
var util = {
  // 日期格式化
  dateFormat: fucntion(){
    Date.prototype.Format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
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
        url += '&';
    }
    url += encodeURIComponent(name) + '=' +encodeURIComponent(value);
    return url;
  },
	
};


