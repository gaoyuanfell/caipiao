export default {
    setUser(state,data = {}){
        Object.assign(state.user,data);
    }
}
