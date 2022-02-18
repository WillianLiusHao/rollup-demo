import { track } from './effect'

const createGetter = (isReadonly = false, shallow = false) => {
  return function get(target: any, key: string) {
    const result = Reflect.get(target, key)
    // 依赖收集
    console.log(`获取${key}数据, 收集依赖`);
    if (!isReadonly) {
      // 在触发 get 的时候进行依赖收集
      track(target, "get", key);
    }
    return result
  }
}

const createSetter = (shallow = false) => {
  return function set(target: any, key: string, value: any) {
    const result = Reflect.set(target, key, value)
    // 依赖更新
    console.log(`设置${key}数据为${value}, 触发依赖更新`);
    return result
  }
}

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

export const reactiveHandle = {
  get,
  set
}

export const readonlyHandle = {
  readonlyGet,
  set: (target, key, value) => {
    console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target)
    return true
  }
}