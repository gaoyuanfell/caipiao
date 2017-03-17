export default {
    setUser(state,data = {}){
        state.user = data;
        // Object.assign(state.user,data);
    }
}
