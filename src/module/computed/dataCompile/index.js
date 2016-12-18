/*
  此模块的功能：
  -数据校验，对用户传来的非法数据进行报错(checkValid)
    要求：
    指明出错的对象出错原因
    索引位置

  -将用户给到的数据进行默认值的补充(setDefault)
    要求：
    用户未提供answerIndex时默认使用第0个
    option未声明的情况下使用['是','否']
*/
import checkValid from './checkValid'
import setDefault from './setDefault'

function DataCompile(questions,options){
  this.questions=questions//题目数组对象
  this.options=options//默认参数设置

  this.items=[]//经过模块加工过的数据对象，最终传递给调用者

  return this.init()
}

DataCompile.prototype={
  checkValid,//校验数据
  setDefault,//填充默认参数到数据对象
  init (){
    this.checkValid() && this.setDefault()

    return this.items
  }
}

export default DataCompile
