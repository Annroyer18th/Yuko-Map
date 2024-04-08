import { getCurrentInstance, onMounted, provide, shallowReactive, type Ref } from "vue"
import { OLKEY } from "../const"
import { Map, View } from "ol"
import "ol/ol.css"
import { fromLonLat } from "ol/proj"
import TileLayer from "ol/layer/Tile"
import XYZSource from "ol/source/XYZ"
import type { OlProvideContext } from "../types"

const useProvideContext = (el?: Ref<HTMLElement>) => {
  const olContext = shallowReactive<OlProvideContext>({
    mapInstance: new Map({
      view: new View({
        center: fromLonLat([121.89314, 29.15674]),
        zoom: 8
      }),
      layers: [
        new TileLayer({
          // source: new OSM(),
          source: new XYZSource({
            tileUrlFunction: function ([z, x, y]) {
              // return 'http://mapserver.com/' + coordinate[0] + '/' +
              //    coordinate[1] + '/' + (-coordinate[2] - 1) + '.png';
              return `https://m12.shipxy.com/tile.c?l=Na&m=o&x=${x}&y=${y}&z=${z}`
            }
          })
          // https://m12.shipxy.com/tile.c?l=Na&m=o&x=215&y=106&z=8
        })
      ]
    })
  })

  const instance = getCurrentInstance()

  onMounted(() => {
    olContext.mapInstance.setTarget(el || instance?.proxy?.$el)
  })

  provide(OLKEY, olContext)

  return olContext
}

export default useProvideContext
