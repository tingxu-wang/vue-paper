/*
  校验用户传来的数据中的错误,根据错误类型抛出提示信息到控制台
*/

export default function checkValid (){
  let questions=this.questions

  let main=Object.setPrototypeOf({
    successInfo:{status:1},
    result:true//模块的最终返回结果，函数体的最后返回
  },{
    errorInfo (msg){
      return {status:0,msg}
    },
    throwError (str,index){
      console.error(str+'！错误的题目索引为：'+index)
      this.result=false
    },
    checkTitle (question){
      const title=question.title

      if(typeof title!=='string'){
        return this.errorInfo('title属性的值必须为字符串')
      }else{
        if(title.length===0){
          return this.errorInfo('title属性不能为空字符串')
        }
        return this.successInfo
      }
    },
    checkType (question){
      const type=question.type

      if(type!=='radio' && type!=='select'){
        return this.errorInfo("type值只能为'radio'或'select'")
      }
      return this.successInfo
    }
  })

  /*
    保存校验模块运行的结果，每一个模块函数调用后返回的是结果对象
    最后保存到saveResult数组之中遍历抛出错误信息到控制台
  */
  questions.forEach((question,index)=>{
    let saveResult=[]

    let type=main.checkType(question),
        title=main.checkTitle(question)

    saveResult.push(type,title)

    saveResult.forEach((result)=>{
      if( !result.status ){
        main.throwError(result.msg,index)
      }
    })
  })

  return main.result
}
