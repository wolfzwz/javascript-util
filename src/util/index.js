export { util } from './util';
export { currency } from './currency';
export { EventTarget } from './eventTarget';
// ip 1.0.0.0/www.baidu.com 可以为ip或者域名
export const checkIp = ip => {
  if (ip) {
    function domainURI(str) {
      const durl = /(http:\/\/|https:\/\/)?(.+)/i;
      const domain = str.match(durl);
      if (domain) {
        return domain[domain.length - 1];
      } else {
        return undefined;
      }
    }

    let hostOrIp = domainURI(ip);
    // _fetch为fetch请求方法或者其它ajax方法
    _fetch(`https://${hostOrIp}`, {
      method: 'GET',
      mode: 'no-cors'
    }).then(
      res => {
        console.log(res, 'withCdnIp');
        setIp(hostOrIp);
      },
      reject => {
        setIp(undefined);
        console.log('withCdnIp', 'reject');
      }
    );
  }
};
// 通过图片请求来确认ip是否可以访问 ip 1.0.0.0/www.baidu.com 可以为ip或者域名
export const checkIpByImage = ip => {
  var img = new Image();
  var start = new Date().getTime();
  img.src = 'http://' + ip + '?t=' + start;
  var flag = false; //无法访问
  img.onload = function() {
    flag = true;
    console.log('ok');
  };
  img.onerror = function() {
    flag = true;
    console.log('ok');
  };
  var timer = setTimeout(function() {
    if (!flag) {
      //如果真的无法访问
      flag = false;
      console.log('failed');
    }
  }, 1500);
};

// 日期格式化
export const dateFormat = () => {
  Date.prototype.Format = function(fmt) {
    var o = {
      'M+': this.getMonth() + 1, //月份
      'd+': this.getDate(), //日
      'h+': this.getHours(), //小时
      'm+': this.getMinutes(), //分
      's+': this.getSeconds(), //秒
      'q+': Math.floor((this.getMonth() + 3) / 3), //季度
      S: this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        );
    return fmt;
  };
};
//序列化表单
export const serialize = form => {
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
  for (i = 0, len = form.elements.length; i < len; i++) {
    field = form.elements[i];
    switch (field.type) {
      case 'select-one':
      case 'select-mutiple':
        if (field.name.length) {
          for (j = 0, optLen = field.options.length; j < optLen; j++) {
            option = field.options[j];
            if (option.selected) {
              optValue = '';
              if (option.hasAttribute) {
                optValue = option.hasAttribute(value) ? option.value : option.text;
              } else {
                optValue = option.attributes['value'].specified ? option.value : option.text;
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
        if (!field.checked) {
          break;
        }
      default:
        if (field.name.length) {
          parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
        }
    }
    return parts.join('&');
  }
};
//处理查询字符串函数
export const addQueryStringArg = (url, name, value) => {
  //url
  //name 参数名
  //value 参数值
  if (url.indexof('?') === -1) {
    url += '?';
  } else {
    url += '&';
  }
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
  return url;
};
// 判断浏览器
export const getBrowserType = () => {
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  // 如果是该版本浏览器则Sys对应属性if判断成立，否则没有指，为undefined
  (s = ua.match(/msie ([\d.]+)/))
    ? (Sys.ie = s[1])
    : (s = ua.match(/firefox\/([\d.]+)/))
    ? (Sys.firefox = s[1])
    : (s = ua.match(/chrome\/([\d.]+)/))
    ? (Sys.chrome = s[1])
    : (s = ua.match(/opera.([\d.]+)/))
    ? (Sys.opera = s[1])
    : (s = ua.match(/version\/([\d.]+).*safari/))
    ? (Sys.safari = s[1])
    : 0;
  return Sys;
};
