function $proxy(_key, agent = {}) {
    if (window.localStorage.getItem(_key)) {
        let s = JSON.parse(window.localStorage.getItem(_key));
        Object.assign(agent,s);
    }
    return new Proxy(agent, {
        get: function (target, key, receiver) {
            return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
            let b = Reflect.set(target, key, value, receiver);
            if (b) {
                window.localStorage.setItem(_key, JSON.stringify(target))
            }
            return b;
        },
        deleteProperty: function (target, key) {
            if (Reflect.has(target, key)) {
                let b = Reflect.deleteProperty(target, key);
                if(b){
                    window.localStorage.setItem(_key, JSON.stringify(target))
                }
                return b;
            }
            return false;
        }
    });
}

export default $proxy;
