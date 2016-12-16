/*
  校验用户传来的数据中的错误,根据错误类型抛出提示信息到控制台
*/

export default function checkValid (){
  let questions=this.questions,
      successInfo={status:1}

  function errorInfo(msg){
    return {
      status:0,
      msg
    }
  }

  function checkTitle (question,index){//检查title是否合法
    const title=question.title

    if(typeof title!=='string'){
      return errorInfo('title属性的值必须为字符串')
    }else{
      if(title.length===0){
        return errorInfo('title属性不能为空字符串')
      }
      return successInfo
    }
  }

  for(let i=0;i<questions.length;i++){//遍历数组
    let index=i,
        question=questions[index],
        resultInfo=checkTitle(question,index)

    function throwError (str){
      console.error(str+'！错误的题目索引为：'+index)
      return false
    }

    if( !resultInfo.status ){
      return throwError(resultInfo.msg)
    }
    console.log('run')

    switch (question.title){
      case 'radio':

        break;
    }
  }
}
