import Decorate from '@/views/decorate/Decorate';
import Alldecorate from '@/views/decorate/alldecorate';
import Partdecorate from '@/views/decorate/partdecorate';
import detail from '@/views/decorate/detail';
import toolquote from '@/views/decorate/toolquote';
import designerlistpage from '@/views/decorate/designerlistpage';
import designerdetail from '@/views/decorate/designerdetail';

var DecorateRouter = [{
        path: '/decorate',
        component: Decorate
    },
    {
        path: '/decoration/shop/list/fullset',
        component: Alldecorate
    },
    {
        path: '/decoration/shop/list/partial',
        component: Partdecorate
    },
    {
        path: '/decoration/shopdetail',
        component: detail,
    },
    {
        path: '/decoration/tool/quote/page',
        component: toolquote
    },
    {
        path: '/decoration/designerlistpage',
        component: designerlistpage
    },
    {
        path: '/decoration/designer/detail',
        component: designerdetail
    }
]
export default DecorateRouter;