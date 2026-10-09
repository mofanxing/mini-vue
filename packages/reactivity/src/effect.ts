export function track(target, key) {
    console.log('收集依赖');
    
}

export function trigger(target, key) {
    console.log('触发依赖');
    
}