export default {
    setUser(state,data = {}){
        let user = state.user;
        Object.assign(user,data)
        state.user = data;
        state.user = user;
    }
}