# vue-paper
ver 1.3.1_Alpha
***

## 简介
该项目是利用vue实现的问卷生成插件，本人阴差阳错接到了一个类似于问卷的页面制作需求，
要求通过radio，select组合实现一个由单选题组成的调差问卷，正巧最近在学习使用vue.js
因此就用顺手写出了一个页面

但在制作的过程之中遇到了一个问题：数据在渲染生成view的最佳实践

刚开始制作的时候并没有想太多，直接将数据嵌套在了component之中然后通过在DOM中加入v-if
去实现分支逻辑譬如：
```html
<!-- question.vue -->

<div class="checkbox">
  <label>问题一</label>
  <label>是<input type="radio" :value="1" v-model="q11" /></label>
  <label>否<input type="radio" :value="2" v-model="q11" /></label>
</div>
<!-- 利用第一道题的答案区分分支 -->
<template v-if="q11===1"><!-- 分支1 -->
  <div class="checkbox">
    <label>问题一选择‘是’之后的分支</label>
    <label>是<input type="radio" :value="1" v-model="q12"/></label>
    <label>否<input type="radio" :value="2" v-model="q12"/></label>
  </div>
  <!-- ...... -->
</template>
<template v-if="q11===2"><!-- 分支2 -->
  <div class="checkbox">
    <label>问题一选择‘否’之后的分支</label>
    <label>是<input type="radio" :value="1" v-model="q13"/></label>
    <label>否<input type="radio" :value="2" v-model="q13"/></label>
  </div>
  <!-- ...... -->
</template>
```

这样的实现明显是有问题的，首先view和module揉在了一起，基本是百分百的耦合，没有任何可扩
展性而且只是机械的重复相同的代码逻辑，任何重复的部分理论上都应该用引用+遍历的方式解决，
因此促使了我针对问卷业务轮子编写的进度，也就是这个库

---

## api接口

- 题目数据 `data` `type:Array`

  本框架接受一个由对象组成的数组作为数据源

```javascript
const questionData=[{
  type:'radio',
  title:'您的性别是什么？',
  option:['男','女']
},
{
  type:'radio',
  mode:'hard',
  title:'您是否已通过英语四级？',
  answerIndex:0
}
//......
]
```
一个对象表示一道题目，框架会按照数组的存放顺序从上至下展示答卷

| 输入项 | 数据类型 | 可选值 | 描述 | 是否必填 |
| :-- | :-- | :-- | :-- | :-- |
| type | String | 'radio','select' | 题目的种类 | 是 |
| title | String | 任意字符串 | 题目的文本 | 是 |
| mode | String | 'default','hard','branch' | 控制题目的种类(更多信息请查看详细说明 | 否 |
| endMessage | String | 任意字符串 | 在 `mode:'hard'` 前提下用户选中错误选项，答题结束后出现的结束文本提示 | 否 |
| answerIndex | Number | 数字 | 在使用'hard'模式的时候正确答案在选项中的位置索引，若未填写，默认索引为数组中的第0个 | 否 |
| option | Array | 由字符串组成的数组 | 题目选项的文本，若未声明该字面量，默认使用['是','否'] | 否 |


- 默认配置覆盖 `options` `type:Object`

如前所述，在一些参数属性在题目对象之中没有显式声明的时候vue-paper将采用默认值进行填充，但如果说你想定制默认配置的话options就派上了用场

框架的默认参数配置如下：

| 未显式声明的属性 | 默认参数配置 |
| :-- | :-- |
| mode | 'default' |
| endMessage | '答题结束！' |
| answerIndex | 0 |
| option | ['是','否'] |

你可以在vue-paper DOM标签内加入`options` props参数覆盖上述的默认配置，
vue-paper会优先采用你传入的默认选项渲染view层
```html
  <!-- options参数传入到vue-paper标签之内以覆盖框架的默认配置 -->
  <vue-paper :msg="questionData" :options="options"></vue-paper>

```

---

## 使用说明（本示例采用了ES2015的语法，请实际使用的时候使用webpack+babel编译）

** 在example文件夹下有实际的可运行示例以供参考 **

- 数据对象模块：

```javascript
/*question.js*/
/*
问卷题目数据数组对象，这里为了方便展示说明而使用的是静态文件
正式使用的时候你应该采取ajax的方式获取数据对象
获取题目对象之后，加到vue实例的data之中即可
*/
export default [
  {
    type:'radio',
    title:'您的性别是什么？',
    option:['男','女']
  },
  {
    type:'radio',
    mode:'hard',
    title:'您是否已通过英语四级？',
    answerIndex:0
  }
  //...
]
```

- 默认值设置模块

```javascript
/* options.js */
/*
  你可以用一个对象来显示的覆盖vue-paper的默认参数
*/

export default {
  option:['yes','no']//这样设置后，框架的默认option值会被覆盖
}

```

在你的脚本文件之中引用VuePaper模块,将其加入到vue实例中的components中,
如果你想在组件之中使用VuePaper.vue,可将其放入到组件中的components之中

```javascript
/*index.js*/
//引入问卷题目数据数组对象
import questionData from './data/question'
//引入你要覆盖的配置对象
import options from './data/options'
//引入VuePaper模块
import VuePaper from 'vue-paper/vue-paper'

//vue实例
const vm=new Vue({
  //...
  el:'.app',
  data:{
    questionData,
    options
  },
  components:{
    VuePaper
  }
  //...
})

```
html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>vue</title>
</head>
<body>
  <div class="app">
    <!-- 在view之中利用标签加载VuePaper组件，并利用msg变量传入题目信息数组 -->
    <!-- 如果想修改vue-paper的默认参数可以用:options传入一个对象用于覆盖默认配置 -->
    <!-- 这里要注意，自定义组件标签是不支持大写的 -->
    <vue-paper :msg="questionData" :options="options"></vue-paper>
  </div>
  <script src="dist/index.js"></script>
</body>
</html>
```
---

## 题型种类详细说明

### 单选题（radio）`type:radio`
* 选择后继续作答 `mode:default`

  这类题的提点是无论作答正确与否都继续显示下一道题型，为本框架单选题采用的默认处理方式
  如果没有显示的声明使用default模式，框架会默认采用这种方式展现

* 错误直接输出结果 `mode:hard`

  这类题的特点是选择正确的话继续出现新的问题，继续做答，但一旦选错的话直接输出测试结果
  结束当次测试，使用该模式的情况下必须配合参数`answerIndex`使用，该参数指定的选项索引值为正确选项的索引，其余选项都视为错误选项，若未在数据对象中设置此参数默认值索引值为0

* 分支模式 `mode:branch`

  在此模式下，每一个option选项都会将后续的问题展示分开展示

  * 譬如这样一道题问：您是否为本科以上学历？

    这道题的选项分别为'是'和'否'，根据用户的选择分别导向两套完全不同的题目

  在使用这一模式的情况之下，在对象中添加另一个`subData`字面量用来提供两套题目的数据
  ```javascript
  //一个采用了branch功能的题目对象
  {
    type:'radio',
    option:['是','否'],//type:'radio'下的默认设置，这里我们把它显式设置出来
    title:'您是否为本科以上学历？',
    mode:'branch',
    subData:[
      [//选择'是'后所展现的题目对象组成的数组
        {
          type:'radio',
          option:['已经通过','未通过'],
          title:'您是否已经通过英语四级考试？'，
          mode:'default'//mode的默认设置
        }
        //.....
      ],
      [//选择'否'后所展现的题目对象组成的数组
        {
          type:'radio',
          option:['是','否'],
          title:'您是否已经拥有社会工作经验？'，
          mode:'default'//mode的默认设置
        }
        //.....
      ]
    ]
  }

  ```
