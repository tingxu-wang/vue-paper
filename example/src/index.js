/* 页面主脚本文件 */
import Vue from 'STATIC/vue/vue.min'
/* 问卷信息数组对象 */
import questionData from './data/question'
/* 默认设置更改 */
import options from './data/options'

import VuePaper from 'PRJ_ROOT/src/vue-paper'

const vm=new Vue({
  el:'.app',
  data:{
    questionData,
    options
  },
  components:{
    VuePaper
  }
})

//vue-devtools 配置
Vue.config.devtools=true
