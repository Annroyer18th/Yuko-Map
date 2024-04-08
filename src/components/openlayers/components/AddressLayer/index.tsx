import { defineComponent } from "vue"
import { useInjectContext } from "../../hooks"
import VectorSource from "ol/source/Vector"
import VectorLayer from "ol/layer/Vector"
import { Feature } from "ol"
import { Point } from "ol/geom"
import { fromLonLat } from "ol/proj"
import Style from "ol/style/Style"
import Icon from "ol/style/Icon"
import framePng from "./frame.png"
const shipData = {
  ship: [
    {
      cog: 138.2,
      commtype: "1",
      hdg: 0,
      lasttime: 1709707346000,
      lat: 29.18649,
      lon: 120.92372,
      mmsi: "1",
      navistat: 0,
      postime: 1709707346000,
      receivetime: 1709707347000,
      rot: 0,
      sog: 0.1
    },
    {
      cog: 0,
      commtype: "1",
      hdg: 0,
      lasttime: 1709707311000,
      lat: 29.884,
      lon: 122.37302,
      mmsi: "2",
      navistat: 0,
      postime: 1709707311000,
      receivetime: 1709707311000,
      rot: 0,
      sog: 0
    },
    {
      cog: 292.9,
      commtype: "1",
      hdg: 0,
      lasttime: 1709707435000,
      lat: 29.04145,
      lon: 121.62323,
      mmsi: "3",
      navistat: 0,
      postime: 1709707435000,
      receivetime: 1709707436000,
      rot: 0,
      sog: 0
    },
    {
      cog: 154.5,
      commtype: "1",
      hdg: 145,
      lasttime: 1709707726000,
      lat: 29.47378,
      lon: 121.5703,
      mmsi: "4",
      navistat: 1,
      postime: 1709707726000,
      receivetime: 1709707726000,
      rot: 0,
      shipNameCn: "围海桩208",
      shipNameEn: "WEI HAI ZHUANG 208",
      shipType: "04",
      shipTypeCode: "0407",
      shipTypeName: "打桩船",
      sog: 0.1,
      ywcm: "WEI HAI ZHUANG 208",
      zwcm: "围海桩208"
    },
    {
      cog: 65.2,
      commtype: "1",
      hdg: 0,
      lasttime: 1709707347000,
      lat: 29.15875,
      lon: 121.84239,
      mmsi: "5",
      navistat: 0,
      postime: 1709707347000,
      receivetime: 1709707348000,
      rot: 0,
      sog: 0.1
    },
    {
      cog: 0,
      commtype: "1",
      hdg: 0,
      lasttime: 1709708503000,
      lat: 29.15674,
      lon: 121.89314,
      mmsi: "6",
      navistat: 0,
      postime: 1709708503000,
      receivetime: 1709708511000,
      rot: 0,
      shipNameCn: "鑫乐58",
      shipNameEn: "XIN LE 58",
      shipType: "05",
      shipTypeCode: "0504",
      shipTypeName: "油污水处理船",
      sog: 0,
      ywcm: "XIN LE 58",
      zwcm: "鑫乐58"
    },
    {
      cog: 3.3,
      commtype: "1",
      hdg: 0,
      lasttime: 1709707715000,
      lat: 29.04028,
      lon: 121.63289,
      mmsi: "7",
      navistat: 0,
      postime: 1709707715000,
      receivetime: 1709707715000,
      rot: 0,
      sog: 0
    },
    {
      cog: 78.7,
      commtype: "1",
      hdg: 0,
      lasttime: 1709708177000,
      lat: 29.04354,
      lon: 122.70271,
      mmsi: "8",
      navistat: 0,
      postime: 1709708177000,
      receivetime: 1709708208000,
      rot: 0,
      sog: 0.6
    },
    {
      cog: 68.9,
      commtype: "1",
      hdg: 90,
      lasttime: 1709708579000,
      lat: 29.14633,
      lon: 122.03203,
      mmsi: "9",
      navistat: 0,
      postime: 1709708579000,
      receivetime: 1709708580000,
      rot: 0,
      sog: 1.7
    },
    {
      cog: 125,
      commtype: "1",
      hdg: 0,
      lasttime: 1709708418000,
      lat: 29.18423,
      lon: 121.90069,
      mmsi: "10",
      navistat: 0,
      postime: 1709708418000,
      receivetime: 1709708471000,
      rot: 0,
      sog: 0
    }
  ]
}

export default defineComponent({
  emits:['click'],
  setup(_props,{emit}) {
    const { mapInstance } = useInjectContext()

    // 站点源
    const positionSource = new VectorSource({})
    //站点图层
    const positionLayer = new VectorLayer({})

    const iconFeature = shipData.ship.map(
      (item) => {
        const feature = new Feature(new Point(fromLonLat([item.lon, item.lat])));
        feature.set('data',item)
        return feature;
      }
    )
    //定义元素样式
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: framePng,
      })
    })

    //设置元素样式
    for (let i = 0, length = iconFeature.length; i < length; i++) {
      iconFeature[i].setStyle(iconStyle)
    }
    //添加元素到站点源
    positionSource.addFeatures(iconFeature)
    //添加站点源到站点图层
    positionLayer.setSource(positionSource)


    //添加事件
    mapInstance.addEventListener('singleclick',function (evt) {
      const feature = mapInstance.forEachFeatureAtPixel((evt as any).pixel, function (feature) {
        return feature;
      });
      //判断feature，如果为undefined，则用户点到非标记区域，取消建立新弹窗，并且跳出事件函数
      if (!feature) {
        // popup.setPosition(undefined);
        emit('click',null)
        return;
      }

      emit('click',feature.get('data'))
    })



    mapInstance.addLayer(positionLayer)

    return ()=> <div data-tag='address-layer'></div>;
  }
})
