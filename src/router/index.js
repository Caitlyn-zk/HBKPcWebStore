// 路由
import Vue from 'vue'
import Router from 'vue-router'
import $store from '@/store'
import {toLogin,toOrgLogin} from '@/libs/login'

const Frontnav = () => import('@/components/fontnav/fontnav.vue')
const Footer = () => import('@/components/fontfooter/fontfooter.vue')
const Index = () => import('@/views/index.vue')
// 关于我们
const AboutUs = () => import('@/views/aboutus/aboutus.vue')
// const AD = () => import('@/views/front/ad/ad.vue')

// 引入模块
import Store from './model/store'
// import Account from './model/account'
import User from './model/user'


Vue.use(Router)
const router = new Router({
    mode: 'hash',
    // mode: 'history',
    routes: [
        /**  --------------------------------- front前端页面 ---------------------------------  */
        {
            path: '/',
            name: 'CmpFrontindex',
            meta: {
                title: '环科宝',
                keepAlive:true,
                auth: false
            },
            components: {
                Head: Frontnav,
                body: Index,
                Foot: Footer
            }
        },
        // ...College,
        // ...Project,
        // ...Rectuit,
        ...Store,
        ...User,
        // ...Account,
    
       
         {
            path: '/aboutus',
            name: 'Aboutus',
            meta: {
                title: '关于我们',
                keepAlive: false,
                auth: false
            },
            components: {
                Head: Frontnav,
                body: AboutUs,
                Foot: Footer
            }
        },
    ]
})

const { back, replace } = router

router.back = function() {
    this.isBack = true
    back.call(router)
}
router.replace = function(...args) {
    this.isReplace = true
    replace.call(router, ...args)
}

router.beforeEach((to, form, next) => {
    const { title, backgroundColor, footer, home, auth,isOptOrg } = to.meta
    
    if(to.path!='/account/login'  && to.path!='/account/register' && to.path.indexOf("/account/user") == -1 ){
        sessionStorage.setItem('referrer',to.path)
    }
    if (auth === true && !$store.state.app.token) {
        if(isOptOrg){
            if (form.name === 'AccountOrgLogin') return
            return toOrgLogin(true, to.fullPath)
        }else{
            if (form.name === 'AccountPersonalLogin') return
            return toLogin(true, to.fullPath)
        }
        
    }
    document.title = title || process.env.VUE_APP_NAME || ''
        // 判断是否显示底部导航
    footer === true ? $store.commit('SHOW_FOOTER') : $store.commit('HIDE_FOOTER')

    // 控制悬浮按钮是否显示
    home === false ? $store.commit('HIDE_HOME') : $store.commit('SHOW_HOME')

    $store.commit('BACKGROUND_COLOR', backgroundColor || '#F5F5F5')

    if (auth) {
        // console.log("ROUTER PATH  IS " + to.fullPath + " " + form.fullPath);
        // console.log("ROUTER USER INFO IS" + to.fullPath + " "+JSON.stringify($store.state.app.userInfo));

        $store.dispatch('USERINFO').then(() => {
            // console.log("USERINFO   ");
            next();
           
        })
    } else {
        next()
    }
   
})

router.afterEach(to => {
    // let meta = { ...to.meta }
    // if (meta.title) {
    //   document.title = appConfig.appTitle + '-' + to.meta.title;
    // }
    // iView.LoadingBar.finish()
    
    window.scrollTo(0, 0)
})
// 解决NavigationDuplicated报错
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}

export default router
