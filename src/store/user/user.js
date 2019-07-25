const state = {
    name: window.localStorage.getItem("name") || "",
    isAdmin:window.localStorage.getItem("isAdmin") || false,
};
const mutations = {
    USER_NAME(state,payload){
        state.name = payload.name;
        state.isAdmin = payload.isAdmin;
    }
};
const actions = {

};
export default{
    namespaced : true,
    state,
    mutations,
    actions
}