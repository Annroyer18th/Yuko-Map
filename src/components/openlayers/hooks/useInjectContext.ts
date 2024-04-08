import { inject } from "vue"
import { OLKEY } from "../const"
import type { OlProvideContext } from "../types"

const useInjectContext = (): OlProvideContext => {
  const context = inject<OlProvideContext>(OLKEY)
  if (!context) {
    throw new Error("lack context")
  }

  return context
}

export default useInjectContext
