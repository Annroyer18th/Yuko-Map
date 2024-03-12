import shipData from './ship.json';
import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import {Tile as TileLayer} from 'ol/layer.js';
import View from 'ol/View.js';
import {fromLonLat, toLonLat} from 'ol/proj.js';
import {toStringHDMS} from 'ol/coordinate.js';
import {Feature} from 'ol';
import {Icon, Style} from 'ol/style.js';
import {OGCMapTile, Vector as VectorSource} from 'ol/source.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import {Point} from 'ol/geom';
import OSM from 'ol/source/OSM.js';
import XYZ from 'ol/source/XYZ';

//地图源
console.log(shipData);
console.log(shipData.ship);
console.log(shipData.ship[0].lat);
const layer = new TileLayer({
  // source: new OSM(),
  source: new XYZ({
    tileUrlFunction: function ([z, x, y]) {
      // return 'http://mapserver.com/' + coordinate[0] + '/' +
      //    coordinate[1] + '/' + (-coordinate[2] - 1) + '.png';

      return `https://m12.shipxy.com/tile.c?l=Na&m=o&x=${x}&y=${y}&z=${z}`;
    },
  }),
  // https://m12.shipxy.com/tile.c?l=Na&m=o&x=215&y=106&z=8
});

// ________站点图层

// 站点源
const positionSource = new VectorSource({});

//站点图层
const positionLayer = new VectorLayer({});

// const aFeature = new Feature({
//   geometry: new Point([0, 0]),
//   name: 'Null Island',
//   population: 4000,
//   rainfall: 500,
// });
// console.log(aFeature);
const iconFeature = shipData.ship.map(
  (item) => new Feature(new Point(fromLonLat([item.lon, item.lat]))),
);
const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'data/Frame.png',
  }),
});

console.log(iconFeature);
console.log(iconFeature.length);

//设置元素样式
for (let i = 0, length = iconFeature.length; i < length; i++) {
  iconFeature[i].setStyle(iconStyle);
}
//添加元素到站点源
positionSource.addFeatures(iconFeature);
//添加站点源到站点图层
positionLayer.setSource(positionSource);

//生成地图
const map = new Map({
  //地图背景图层，加上站点图层
  layers: [layer, positionLayer],
  target: 'map',
  //初始视图中心点
  view: new View({
    center: fromLonLat([121.89314, 29.15674]),
    zoom: 8,
  }),
});

//获取popup标签
const element = document.getElementById('popup');
//为map添加overlay
const popup = new Overlay({
  element: element,
  stopEvent: false,
});
map.addOverlay(popup);

// const element = popup.getElement();
//点击后改变popover状态，用来判断是否显示弹窗
let popover;
function disposePopover() {
  if (popover) {
    popover.dispose();
    popover = undefined;
  }
}

//点击地图点位显示详细信息

map.on('singleclick', function (evt) {
  // 只有点击到元素给提示

  let popover = bootstrap.Popover.getInstance(element);
  //判断popover，如果存在，即点击到新元素，且不为现有弹窗，则取消现有弹窗，准备建立新弹窗

  if (popover) {
    popover.dispose();
  }
  // map.forEachFeatureAtPixel，点击后获取图层元素，有则返回元素，没有就返回undifined。
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });
  console.log(feature);
  //判断feature，如果为undefined，则为点到非标记区域，取消建立新弹窗，并且跳出事件函数
  if (!feature) {
    disposePopover();
    return;
  }

  //记录点击处的经纬度并显示
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));
  popup.setPosition(coordinate);

  popover = new bootstrap.Popover(element, {
    placement: 'top',
    animation: false,
    container: element,
    content:
      '<div><p>地点：南海</p><p>经度：120 纬度：90</p> <p>采集时间：2024年12月30日 12时34分</p><p>存储内容：风速 海面温度</p> <p>噪声：500HZ</p> </div><code>' +
      hdms +
      '</code>',
    html: true,
    title: '一号检测点',
  });
  popover.show();
});

//鼠标移动到标志改变样式
// map.on('pointermove', function (e) {
//   const pixel = map.getEventPixel(e.originalEvent);
//   const hit = map.hasFeatureAtPixel(pixel);
//   map.getTarget().style.cursor = hit ? 'pointer' : '';
// });
//移动地图后关闭弹窗
map.on('movestart', disposePopover());
