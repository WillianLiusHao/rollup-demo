(function () {
    'use strict';

    
    /* 
     * author: lzh
     * time: 2022/2/18
    */


    const createGetter = (isReadonly = false, shallow = false) => {
        return function get(target, key) {
            const result = Reflect.get(target, key);
            // 依赖收集
            console.log(`获取${key}数据, 收集依赖`);
            return result;
        };
    };
    const createSetter = (shallow = false) => {
        return function set(target, key, value) {
            const result = Reflect.set(target, key, value);
            // 依赖更新
            console.log(`设置${key}数据为${value}, 触发依赖更新`);
            return result;
        };
    };
    const get = createGetter();
    const set = createSetter();
    const readonlyGet = createGetter(true);
    const reactiveHandle = {
        get,
        set
    };
    const readonlyHandle = {
        readonlyGet,
        set: (target, key, value) => {
            console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
            return true;
        }
    };

    // 存储全局的响应式数据
    const reactiveMap = new WeakMap();
    const readonlyMap = new WeakMap();
    function reactive(target) {
        return createReactiveObject(target, reactiveMap, reactiveHandle);
    }
    function readonly(target) {
        return createReactiveObject(target, readonlyMap, readonlyHandle);
    }
    // export function shallowReadonly(target) {
    //   return createShallowReadonlyObject(target, reactiveMap, reactiveHandle)
    // }
    const createReactiveObject = (target, proxyMap, baseHandlers) => {
        // 缓存优化
        // 如果存在直接返回即可，无需在创建
        const existPrxoy = proxyMap.get(target);
        if (existPrxoy)
            return existPrxoy;
        const proxy = new Proxy(target, baseHandlers);
        proxyMap.set(target, proxy);
        return proxy;
    };
    // const createShallowReadonlyObject = (target, proxyMap, baseHandlers) => {
    // }

    const obj = reactive({
        name: 'william',
        age: 18
    });
    const obj2 = readonly({
        name: 'john',
        age: 19
    });
    // get
    console.log(obj.name, obj2.name);
    // set
    obj.age += 1;
    obj2.age += 1;

})();

if(typeof window !== 'undefined') {
  window._Dry_VERSION_ = '1.0.0'
}
