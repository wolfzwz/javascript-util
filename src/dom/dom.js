export const dom = {
	//将nodelist类数组对象转成数组
	convertToArray: function(nodes) {
		var arr = null;
		try {
			arr = Array.prototype.slice(nodes, 0);
		} catch (ex) {
			//兼容ie
			for (var i = 0, len = nodes.length; i < len; i++) {
				arr.push(nodes[i]);
			}
		}
		return arr;
	},
	//判断是否为第一个节点 参数为文档节点
	isFirstNode: function(node) {
		if (node.previousSibling === null) {
			return true;
		} else {
			return false;
		}
	},
	//is last node
	islastnode: function(node) {
		if (node.nextSibling === null) {
			return true;
		} else {
			return false;
		}
	},
	// get by class
	getByClass: function(obj, attr) {
		var quanBu = obj.getElementsByTagName('*');
		var arr = [];
		for (i = 0; i < quanBu.length; i++) {
			if (quanBu[i].className == attr) {
				arr.push(quanBu[i]);
			}
		}
		return arr;
	},
	//output element attributes 遍历文档中element元素属性 参数为文档中元素
	outputattributes: function(element) {
		var pairs = new Array(),
			attrName,
			attrValue,
			i,
			len;
		for (i = 0, len = element.attributes.length; i < len; i++) {
			attrName = element.attributes[i].nodeName;
			attrValue = element.attributes[i].nodeValue;
			//Compatible with IE7 and the following versions
			if (element.attributes[i].specified) {
				paris.push(attrName + "=\"" + attrValue + "\"");
			}
			return pairs.join(' ');
		}
	},
	//load script
	loadscript: function() {
		var script = document.createElement('script');
		script.type = "text/javscript";
		script.src = ulr;
		document.body.appendChild(script);
	},
	//load script string inline mode   
	loadscriptstring: function(code) {
		var script = document.createElement('script');
		script.type = "text/javscript";
		try {
			script.appendChild(document.createTextNode(code));
		} catch (ex) {
			//compatible ie
			script.text = code;
		}
		document.body.appendChild(script);
	},
	//load style string
	loadstylestring: function(css) {
		var style = document.createElement('style');
		style.type = 'text/css';
		try {
			style.appendChild(document.createTextNode(css));
		} catch (ex) {
			style.styleSheet.cssText = css;
		}
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(style);
	},

	//get style sheet
	getstylesheet: function(ele) {
		return ele.sheet || ele.styleSheet;
	},
	// get style
	getStyle: function(obj, attr) {
		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, false)[attr];
		}
	},
	//get innerText
	getInnerText: function(ele) {
		return (typeof ele.textContent == "string") ? ele.textContent : ele.innerText;
	},
	//set innerText
	setInnerText: function(ele) {
		if (typeof ele.textContent == "string") {
			//compatible firefox
			ele.textContent = text;
		} else {
			ele.innerText = text;
		}
	},
	// Judge whether a node is a descendant of another node
	contains: function(refNode, otherNode) {
		//webkit>=522 为safaria3以上版本
		//client.engine.webkit为判断浏览器引擎，版本的方法
		if (typeof refNode.contains == "string" && client.engine.webkit >= 522) {
			return refNode.contains(otherNode);
		} else if (typeof refNode.compareDocumentPosition == "function") {
			return !!(refNode.compareDocumentPosition(otherNode) & 16);
		} else {
			var node = otherNode.parentNode;
			do {
				if (refNode === node) {
					return true;
				} else {
					node = node.parentNode;
				}
			} while (node !== null)
			return false;
		}

	},
	//get element left
	getElementLeft: function(ele) {
		var actualLeft = ele.offsetLeft;
		var current = ele.offsetParent;
		while (current !== null) {
			actualLeft += current.offsetLeft;
			current = current.offsetParent;
		}
		return actualLeft;
	},
	//get element top
	getElementTop: function(ele) {
		var actualTop = ele.offsetTop;
		var current = ele.offsetParent;
		while (current !== null) {
			actualTop += current.offsetTop;
			current = current.offsetParent;
		}
		return actualTop;
	},
	//get view prot
	getviewport: function() {
		// <safari 3.1 不支持 BackCompact
		if (document.compatMode == 'BackCompact') {
			//ie7 document.body
			return {
				width: document.body.clientWidth,
				height: document.body.clientHeight
			}
		} else {
			return {
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight
			}
		}
	},
	hasClass: function(ele, selector) {
		//ele 元素
		//selector 
		var eleArr = [ele];

		function stripAndCollapse(value) {
			//非空白字符
			//\x20 空格
			//\t 制表符 \r回车符 \n 换行符 \f 换页符
			var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);
			var tokens = value.match(rnothtmlwhite) || [];
			return tokens.join(" ");
		}

		function getClass(elem) {
			return elem.getAttribute && elem.getAttribute("class") || "";
		}
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ((elem = eleArr[i++])) {
			if (elem.nodeType === 1 &&
				(" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
				return true;
			}
		}

		return false;
	},
	addClass: function(ele, value) {
		//ele 单个元素
		//value 字符串或者数组
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		//ele 元素
		var eleArr = [ele]

		var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);

		function getClass(elem) {
			return elem.getAttribute && elem.getAttribute("class") || "";
		}

		function classesToArray(value) {
			if (Array.isArray(value)) {
				return value;
			}
			if (typeof value === "string") {
				return value.match(rnothtmlwhite) || [];
			}
			return [];
		}

		function stripAndCollapse(value) {
			var tokens = value.match(rnothtmlwhite) || [];
			return tokens.join(" ");
		}

		classes = classesToArray(value);

		if (classes.length) {
			while ((elem = eleArr[i++])) {
				curValue = getClass(elem);
				cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");

				if (cur) {
					j = 0;
					while ((clazz = classes[j++])) {
						if (cur.indexOf(" " + clazz + " ") < 0) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse(cur);
					if (curValue !== finalValue) {
						elem.setAttribute("class", finalValue);
					}
				}
			}
		}
	},
	//remove class
	removeClass: function(ele, str) {
		var arr = ele.className.split(/\s+/);
		var pos = -1,
			i,
			len;
		for (i = 0, len = arr.length; i < len; i++) {
			if (arr[i] == str) {
				pos = i;
				break;
			}
		}
		arr.splice(pos, 1);
		ele.className = arr.join(" ");
	},
	toggleClass: function(ele, value, stateVal) {
		//ele 单个元素
		//value 切换的元素类名 可以是字符串或者数组
		//value 为布尔值时移除所有类名
		var eleArr = [ele];
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray(value);

		var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);

		function getClass(elem) {
			return elem.getAttribute && elem.getAttribute("class") || "";
		}

		function classesToArray(value) {
			if (Array.isArray(value)) {
				return value;
			}
			if (typeof value === "string") {
				return value.match(rnothtmlwhite) || [];
			}
			return [];
		}

		var that = this;

		return eleArr.map(function(self) {
			var className, i, self, classNames;

			if (isValidValue) {

				// Toggle individual class names
				i = 0;
				classNames = classesToArray(value);

				while ((className = classNames[i++])) {

					// Check each className given, space separated list
					if (that.hasClass(self, className)) {
						that.removeClass(self, className);
					} else {
						that.addClass(self, className);
					}
				}
			}
		});
	},
	// 获得相对 容器的位置 容器默认为window，可以通过setting 配置 基于jquery
	// 参照lazyload
	inViewport(element, settings) {
		// 在下边
		const belowTofold = function(element, settings) {
			var fold;

			if (settings.container === undefined || settings.container === window) {
				fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
			} else {
				fold = $(settings.container).offset().top + $(settings.container).height();
			}

			return fold <= $(element).offset().top - settings.threshold;
		};
		// 在右边
		const rightTofold = function(element, settings) {
			var fold;

			if (settings.container === undefined || settings.container === window) {
				fold = $window.width() + $window.scrollLeft();
			} else {
				fold = $(settings.container).offset().left + $(settings.container).width();
			}

			return fold <= $(element).offset().left - settings.threshold;
		};
		// 在上边
		const aboveTotop = function(element, settings) {
			var fold;

			if (settings.container === undefined || settings.container === window) {
				fold = $window.scrollTop();
			} else {
				fold = $(settings.container).offset().top;
			}

			return fold >= $(element).offset().top + settings.threshold + $(element).height();
		};
		// 在左边
		const leftTobegin = function(element, settings) {
			var fold;

			if (settings.container === undefined || settings.container === window) {
				fold = $window.scrollLeft();
			} else {
				fold = $(settings.container).offset().left;
			}

			return fold >= $(element).offset().left + settings.threshold + $(element).width();
		};

		const inviewport = function(element, settings) {
			return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
				!$.belowthefold(element, settings) && !$.abovethetop(element, settings);
		};
		return inviewport;
	}

}
