export default{
    path:"/mine",
    component:()=>import("@/views/Mine/Mine.vue"),
    children:[
        {
            path:"userCenter",
            component:()=>import("@/views/UserCenter/userCenter.vue"),
        },
        {
            path:"login",
            component:()=>import("@/views/Login/Login.vue"),
        },
        {
            path:"register",
            component:()=>import("@/views/Register/Register.vue"),
        },
        {
            path:"findpassword",
            component:()=>import("@/views/FindPassWord/FindPassWord.vue"),
        },
        {
            path:"/mine",
            redirect:"userCenter"
        },
        
    ]
}