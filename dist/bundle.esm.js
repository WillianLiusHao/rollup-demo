/* 
 * author: lzh
 * time: 2022/2/17
*/


// 存储全局的响应式数据
const reactiveMap = new WeakMap();
function reactive(target) {
    return createReactiveObject(target, reactiveMap, {
        get: (target, key) => {
            const result = Reflect.get(target, key);
            // 依赖收集
            console.log(`获取${key}数据, 收集依赖`);
            return result;
        },
        set: (target, key, value) => {
            const result = Reflect.set(target, key, value);
            // 依赖更新
            console.log(`设置${key}数据为${value}, 触发依赖更新`);
            return result;
        }
    });
}
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

const obj = reactive({
    name: 'william',
    age: 18
});
// get
console.log(obj.name);
// set
obj.age += 1;

if(typeof window !== 'undefined') {
  window._Dry_VERSION_ = '1.0.0'
}
