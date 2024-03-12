// import Feature from 'ol/Feature.js';
// import Point from 'ol/geom/Point.js';
// import {Icon, Style} from 'ol/style.js';
// import {OGCMapTile, Vector as VectorSource} from 'ol/source.js';
// import {Vector as VectorLayer} from 'ol/layer.js';
import shipData from './ship.json';

import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import Overlay from 'ol/Overlay.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import {fromLonLat, toLonLat} from 'ol/proj.js';
import {toStringHDMS} from 'ol/coordinate.js';

//地图源
const layer = new TileLayer({
  source: new OSM(),
});

//生成地图
const map = new Map({
  layers: [layer],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

console.log(shipData);
console.log(shipData.ship);
console.log(shipData.ship[0].lat);

//引入经纬度数据
// var xhr1 = new XMLHttpRequest();
// xhr1.open('GET', 'http://localhost:3000/ship', true); //让xhr.onload异步执行
// xhr1.onload = function () {
//   if (xhr1.status === 200) {
//     var jsondata = JSON.parse(xhr1.responseText);
//   }
// };
// xhr1.send();
// console.log(jsondata);

//设置经度，纬度

// let col = 2;
// let shipSet = [];

// for (let i = 0; i < row; i++) {
//   shipSet[i] = [];
//   shipSet[i][0] = Array.of(ship.ship.lon);
//   shipSet[i][1] = Array.of(ship.ship.lat);
//   // 或者其他初始值
// }

// let obj = JSON.parse(shipData); // 解析整个JSON对象为JavaScript对象,shipData引入后已经是js对象
let shipArray = shipData.ship; // 提取"ship"属性，它本身就是一个数组
console.log(Array.isArray(shipArray));
console.log(shipArray[0].lon);

const position = shipArray.map((item) => {
  return [item.lon, item.lat];
});

console.log(position);
// console.log(shipSet);

//fromLonLat可以将原经纬度转换成overlay能识别的经纬度数据
const pos = fromLonLat([30.15674, 30.89314]);

const popup = new Overlay({
  element: document.getElementById('popup'),
});
map.addOverlay(popup);

//循环添加
let row = 10; //数组上限，即船只数量
for (let i = 0; i < row; i++) {
  //fromLonLat将原【lon，lat】转换成overlay能识别的经纬度数据
  let pos1 = fromLonLat(position[i]);

  //添加标志
  let marker = new Overlay({
    position: pos1,
    positioning: 'center-center',
    element: document.getElementById('marker'),
    stopEvent: false,
  });
  map.addOverlay(marker);

  // 添加标志旁文字
  let boat = new Overlay({
    position: pos1,
    element: document.getElementById('title'),
  });
  map.addOverlay(boat);
}

//点击地图任一点位显示详细信息
const element = popup.getElement();
map.on('click', function (evt) {
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));
  popup.setPosition(coordinate);
  let popover = bootstrap.Popover.getInstance(element);
  if (popover) {
    popover.dispose();
  }
  popover = new bootstrap.Popover(element, {
    animation: false,
    container: element,
    content: '<p>经度纬度</p><code>' + hdms + '</code>',
    html: true,
    placement: 'top',
    title: '船只',
  });
  popover.show();
});
