import center from "@/views/center/Center.vue"
import login from "@/views/center/login.vue"
import attention from "@/views/center/attention.vue"
import collect from "@/views/center/collect.vue"
import enter from "@/views/center/enter.vue"
import feedback from "@/views/center/feedback.vue"
import orderForm from "@/views/center/orderForm.vue"
import information from "@/views/center/information.vue"
var centerRouter = [
    {
        path: "/center",
        component: center,
    },
    {
        path: "/login",
        component: login,
    },
    {
        path: "/orderForm",
        component: orderForm
    },
    {
        path: "/feedback",
        component: feedback
    },
    {
        path: "/enter",
        component: enter
    },
    {
        path: "/collect",
        component: collect
    },
    {
        path: "/attention",
        component: attention
    },
    {
        path: "/information",
        component: information
    }
]
export default centerRouter;