export default {
    setUser(state,data = {}){
        let user = state.user;
        Object.assign(user,data)
        state.user = data;
        state.user = user;
    },
    // clearUser(state){
    //     let user = state.user;
    //     for(let u in user){
    //         Reflect.deleteProperty(user,u);
    //     }
    // }
}