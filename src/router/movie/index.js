export default{
    path:"/movie",
    component:()=>import("@/views/Movie/Movie.vue"),
    children:[
        {
            path:"city",
            component:()=>import("@/views/City/City.vue")
        },
        {
            path:"nowplaying",
            component:()=>import("@/views/NowPlaying/NowPlaying.vue")
        },
        {
            path:"comingsoon",
            component:()=>import("@/views/ComingSoon/ComingSoon.vue")
        },
        {
            path:"serach",
            component:()=>import("@/views/Serach/Serach.vue")
        },
        {
            path:"detail/1/:movieID",       //动态路由
            components:{
                default:()=>import("@/views/NowPlaying/NowPlaying.vue"),
                detail:()=>import("@/views/Detail/Detail.vue")
            },
            props : {     //路由传参
                detail : true
            }
        },
        {
            path:"detail/2/:movieID",       //动态路由
            components:{
                default:()=>import("@/views/ComingSoon/ComingSoon.vue"),
                detail:()=>import("@/views/Detail/Detail.vue")
            },
            props : {     //路由传参
                detail : true
            }
        },
        {
            path:"/movie",
            redirect:"/movie/nowplaying"
        }
    ]
}