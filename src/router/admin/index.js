export default{
    path:"/admin",
    component:()=>import("@/views/Admin/admin.vue"),
    children:[
        {
            path:"user",
            component:()=>import("@/views/Admin/user.vue")
        },
        {
            path:"movie",
            component:()=>import("@/views/Admin/movie.vue")
        },
        {
            path:"cinema",
            component:()=>import("@/views/Admin/cinema.vue")
        },
        {
            path:"/admin",
            redirect:"user"
        },
    ]
}