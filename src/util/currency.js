export const currency = {
  /**
   * 价格
   * format('12315','$',2) "$12,315.00"
   *
   * @param {string|number} value 数值
   * @param {string} currency 币种符号
   * @param {nmber} decimals 小数位数
   * @return {string}
   */
  format(value, currency, decimals) {
    const digitsRE = /(\d{3})(?=\d)/g;
    value = parseFloat(value);
    if (!isFinite(value) || (!value && value !== 0)) return '';
    currency = currency != null ? currency : '$';
    decimals = decimals != null ? decimals : 2;
    var stringified = Math.abs(value).toFixed(decimals);
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    var i = _int.length % 3;
    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
    var _float = decimals ? stringified.slice(-1 - decimals) : '';
    var sign = value < 0 ? '-' : '';
    return (
      sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
    );
  },
  /**
   * 价格 可以配置添加逗号
   *
   * @param {*} number 为价格
   * @param {*} places 为保留几位小数
   * @param {*} symbol 为货币类型
   * @param {*} thousand 为几位加逗号
   * @param {*} decimal 小数符号
   * @return {string}
   */
  format1(number, places, symbol, thousand, decimal) {
    number = number || 0;
    places = !isNaN((places = Math.abs(places))) ? places : 2;
    symbol = symbol !== undefined ? symbol : '$';
    thousand = thousand || ',';
    decimal = decimal || '.';
    var negative = number < 0 ? '-' : '',
      i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '',
      j = (j = i.length) > 3 ? j % 3 : 0;
    return (
      symbol +
      negative +
      (j ? i.substr(0, j) + thousand : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
      (places
        ? decimal +
          Math.abs(number - i)
            .toFixed(places)
            .slice(2)
        : '')
    );
  },
};
