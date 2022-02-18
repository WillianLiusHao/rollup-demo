import {
  reactiveHandle,
  readonlyHandle
} from "./baseHandles";


// 存储全局的响应式数据
export const reactiveMap = new WeakMap()
export const readonlyMap = new WeakMap()

export function reactive(target) {
  return createReactiveObject(target, reactiveMap, reactiveHandle)
}

export function readonly(target) {
  return createReactiveObject(target, readonlyMap, readonlyHandle)
}

// export function shallowReadonly(target) {
//   return createShallowReadonlyObject(target, reactiveMap, reactiveHandle)
// }

const createReactiveObject = (target, proxyMap, baseHandlers) => {
  // 缓存优化
  // 如果存在直接返回即可，无需在创建
  const existPrxoy = proxyMap.get(target)
  if(existPrxoy) return existPrxoy

  const proxy = new Proxy(target, baseHandlers)
  proxyMap.set(target, proxy)
  return proxy
}

// const createShallowReadonlyObject = (target, proxyMap, baseHandlers) => {

// }