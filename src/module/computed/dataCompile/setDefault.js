/*
  补全信息的默认值
  如果用户有传入options参数优先使用用户给到的属性值
*/

export default function setDefault(){
  let questions=this.questions,
      options={}//用户设置项覆盖默认配置后生成的最终默认设置

  let main=Object.setPrototypeOf({
    defaultOptions:{//框架默认的设置项
      answerIndex:0,
      mode:'default',
      option:['是','否']
    },
    userOptions:this.options//获取用户传来的设置对象
  },{
    checkUserOptions (){//校验用户配置项，无误返回true，有错误返回false，向浏览器报错
      let userOptions=this.userOptions,
          propertyNames=Object.getOwnPropertyNames(userOptions),//获取用户设置的所有键名
          result=true

      function showError(propertyName){//返回判定结果，如果有问题向浏览器报错
        console.error('"'+ propertyName +'""'+'属性配置错误！')
        result=false
      }

      propertyNames.forEach((propertyName,index)=>{
        let optionValue=userOptions[propertyName]//用户设置对象档次遍历取到的值

        switch (propertyName){
          case 'answerIndex':
            if(typeof optionValue!=='number'){
              showError(propertyName)
            }
          break;
          case 'mode':
            if(optionValue!=='default' && optionValue!=='hard' && optionValue!=='branch'){
              showError(propertyName)
            }
          break;
          case 'option':
            if(! (optionValue instanceof Array)){
              showError(propertyName)
            }
          break;
          default:
            console.error('vue-paper不支持您所传递的options配置属性："'+propertyName+'"')
            result=false
          break;
        }
      })

      return result
    },
    init(){
      console.log(this.checkUserOptions())
    }
  })

  main.init()

  //this.items=this.questions //最终赋值给items让vue-paper渲染
}
