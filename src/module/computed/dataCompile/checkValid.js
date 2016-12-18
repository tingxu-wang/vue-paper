/*
  校验用户传来的数据中的错误,根据错误类型抛出提示信息到控制台

  模块返回布尔值
*/

export default function checkValid (){
  let questions=this.questions

  let main=Object.setPrototypeOf({
    result:true//模块的最终返回结果，函数体的最后返回
  },{
    checkQuestion (question,questionIndex){//对单个题目对象进行信息校验
      let propertyNames=Object.getOwnPropertyNames(question)//题目对象的属性键

      propertyNames.forEach((propertyName)=>{
        let propertyValue=question[propertyName]

        function showError(addition=''){
          console.error('题目对象的'+propertyName+'属性配置错误！'+addition+' 错误的题目索引为：'+questionIndex)
          this.result=false
        }
        switch (propertyName){
          case 'type':
            if(propertyValue!=='radio' && propertyValue!=='select'){
              showError("type值只能为'radio'或'select'")
            }
          break;
          case 'title':
            if(typeof propertyValue!=='string'){
              showError('属性的值必须为字符串')
            }else{
              if(propertyValue.length===0){
                showError('字符串长度不能为0')
              }
            }
          break;
          case 'mode':
            if(propertyValue!=='default' && propertyValue!=='hard' && propertyValue!=='branch'){
              showError("目前只支持'default' 'hard' 'branch'三种模式")
            }
          break;
          case 'option':
            if(! (propertyValue instanceof Array)){
              showError('必须为一个数组')
            }
          break;
          case 'endMessage':
            if(typeof propertyValue!=='string'){
              showError('该属性必须为字符串')
            }else{
              if(propertyValue.length===0){
                showError('字符串长度不能为0')
              }
            }
          break;
          case 'answerIndex':
            if(typeof propertyValue!=='number'){
              showError('必须为一个数字')
            }
          break;
          case '__ob__':
          break;
          default:
            showError('vue-paper不支持你提供的键名')
          break;
        }
      })
    }
  })

  /*
    保存校验模块运行的结果，每一个模块函数调用后返回的是结果对象
    最后保存到saveResult数组之中遍历抛出错误信息到控制台
  */
  questions.forEach((question,index)=>{
    main.checkQuestion(question,index)
  })

  return main.result
}
