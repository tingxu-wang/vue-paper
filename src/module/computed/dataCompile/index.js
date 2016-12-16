/*
  此模块的功能：
  -数据校验，对用户传来的非法数据进行报错
    要求：
    指明出错的对象出错原因
    索引位置

  -将用户给到的数据进行默认值的补充
    要求：
    用户未提供answerIndex时默认使用第0个
    option未声明的情况下使用['是','否']
*/
import checkValid from './checkValid'
import setDefault from './setDefault'

function DataCompile(questions){
  this.questions=questions
}

DataCompile.prototype={
  checkValid,//校验数据
  init (){
    this.checkValid()
  }
}

export default DataCompile
