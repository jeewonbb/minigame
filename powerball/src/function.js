if (
  typeof console === "object" &&
  console.log &&
  typeof console.log === "function"
) {
  if (
    navigator.userAgent.toLowerCase().indexOf("chrome") > -1 ||
    navigator.userAgent.toLowerCase().indexOf("edge") > -1
  ) {
  }
}

if (urlParam("lang") != null) {
  // if ( urlParam('lang') == "en" || urlParam('lang') == "cn" || urlParam('lang') == "zh" || urlParam('lang') == "ko" )
  //     lang_code = urlParam('lang');
}

export function urlParam(name) {
  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.href
  );
  if (results == null) return null;
  else return decodeURIComponent(results[1] || 0);
}

export function displaydate(d, s) {
  return (
    d.getFullYear() + s + digit(d.getMonth() + 1, 2) + s + digit(d.getDate(), 2)
  );
}

export function getQueryString(str, defaultval) {
  let hu = window.location.search.substring(1);
  let gy = hu.split("&");
  for (let i = 0; i < gy.length; i++) {
    let ft = gy[i].split("=");
    if (ft[0] == str) {
      return ft[1];
    }
  }
  return defaultval;
}

export function getQueryString1(str, defaultval) {
  let hu = window.location.search.substring(1);
  let gy = hu.split("&");
  for (let i = 0; i < gy.length; i++) {
    let ft = gy[i].split("token=");
    if (ft[0] == "") {
      return ft[1];
    }
  }
  return defaultval;
}

export function digit(str, index) {
  str = "000000000000000000000000000000000" + str;
  return str.substring(str.length - index, str.length);
}

export function changeUnit(_num, currency) {
  if (currency == "krw") {
    if (_num >= 100000000) return addComma(_num / 100000000) + "억원";
    else if (_num >= 10000000) return addComma(_num / 10000000) + "천만원";
    else if (_num >= 1000000) return addComma(_num / 1000000) + "백만원";
    else if (_num >= 100000) return addComma(_num / 10000) + "만원";
    else if (_num >= 10000) return addComma(_num / 10000) + "만원";
    else if (_num >= 1000) return addComma(_num / 1000) + "천원";
    else return addComma(_num);
  } else {
    if (_num >= 1000000000) return addComma(_num / 1000000000) + "B";
    else if (_num >= 1000000) return addComma(_num / 1000000) + "M";
    else if (_num >= 1000) return addComma(_num / 1000) + "K";
    else return addComma(_num);
  }
}
export function changeUnit_tofixed(_num) {
  let _uni = "";
  if (_num >= 1000000000) {
    _num = _num / 1000000000;
    _uni = "B";
  } else if (_num >= 1000000) {
    _num = _num / 1000000;
    _uni = "M";
  } else if (_num >= 1000) {
    _num = _num / 1000;
    _uni = "K";
  } else {
    _num = _num;
    _uni = "";
  }

  return Math.floor(_num * 10) / 10 + _uni;
  // return addComma(_num.toFixed(1)) + _uni;
}

export function ismobile() {
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  );
}

export function addComma(_num) {
  var returnVal = String(_num);
  while (returnVal.match(/^(-?\d+)(\d{3})/)) {
    returnVal = returnVal.replace(/^(-?\d+)(\d{3})/, "$1,$2");
  }
  return returnVal;
}

export function removeComma(_num) {
  var returnVal = _num.replace(/,/gi, "");
  return returnVal;
}

export function setCookie(cookie_name, value) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + 365);
  var cookie_value = escape(value);
  document.cookie = cookie_name + "=" + cookie_value;
}

export function getCookie(cookie_name) {
  var x, y;
  var val = document.cookie.split(";");

  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf("="));
    y = val[i].substr(val[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == cookie_name) {
      return unescape(y);
    }
  }
}

export function log_check(_data) {
  console.log(_data);
}

export function make_paging(totalcount, limit, page, blockcount, pagefunction) {
  let total_page = Math.ceil(totalcount / limit);
  let total_block = Math.ceil(total_page / blockcount);
  let block = Math.ceil(page / blockcount);

  let first_page = (block - 1) * blockcount + 1;
  let last_page = Math.min(total_page, block * blockcount);
  let prev_block = block - 1;
  let next_block = block + 1;
  let prev_block_page = prev_block * blockcount;
  let next_block_page = block * blockcount + 1;

  let html = '<ul id="pagination" className="pagination">';
  if (prev_block_page > 0)
    html +=
      '<li><a href="javascript:' +
      pagefunction +
      "(" +
      prev_block_page +
      ')">«</a></li>';
  else html += "<li>«</li>";

  for (var i = first_page; i <= last_page; i++) {
    if (page == i)
      html += '<li><a href="#" className="active">' + i + "</a></li>";
    else
      html +=
        '<li><a href="javascript:' +
        pagefunction +
        "(" +
        i +
        ')">' +
        i +
        "</a></li>";
  }

  if (next_block <= total_block)
    html +=
      '<li><a href="javascript:' +
      pagefunction +
      "(" +
      next_block_page +
      ')">»</a></li>';
  else html += "<li>»</li>";
  html += "</ul>";
  return html;
}

export function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
