/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {

  var data = [];
  var list = document.getElementById("source").children;

  for (var i = 0; i < list.length; i++) {
    data[i] = list[i].textContent.split("：");
  }

  return data;

}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
  data.sort(function aqiSort(a, b){
    return a[1] - b[1];
  })

  return data;
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
  var uList = document.getElementById("source");

  for(let i = 0; i < data.length; i++){
    var num = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];

    var b = document.createElement("b");
    var bNode = document.createTextNode( data[i][1] );
    b.appendChild(bNode);

    var l = document.createElement("li");
    var lNode = document.createTextNode( "第"+ num[i] + "名：" + data[i][0] + "：");
    l.appendChild(lNode);
    l.appendChild(b);

    uList.appendChild(l);
  }

}

function btnHandle() {
  var aqiData = getData();
  aqiData = sortAqiData(aqiData);
  render(aqiData);
}

function init() {

  // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
  document.getElementById("sort-btn").onclick = btnHandle;
}

window.onload = function(){
  init();
}