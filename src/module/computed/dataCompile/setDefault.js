/*
  用户options的校验
  补全非必填项的默认值
  如果用户有传入options参数优先使用用户给到的属性值
*/

export default function setDefault(){
  let questions=this.questions,
      items=this.items,//最终赋值给items让vue-paper渲染
      finalOptions={}//用户设置项覆盖默认配置后生成的最终默认设置

  let main=Object.setPrototypeOf({
    defaultOptions:{//框架默认的设置项
      answerIndex:0,
      mode:'default',
      option:['是','否'],
      endMessage:'答题结束！'
    },
    userOptions:this.options//获取用户传来的设置对象
  },{
    checkUserOptions (){//校验用户配置项，无误返回true，有错误返回false，向浏览器报错
      let userOptions=this.userOptions,
          propertyNames=Object.getOwnPropertyNames(userOptions),//获取用户设置的所有键名
          result=true

      propertyNames.forEach((propertyName,index)=>{
        let optionValue=userOptions[propertyName]//用户设置对象档次遍历取到的值

        function showError(addition=''){//返回判定结果，如果有问题向浏览器报错
          console.error('你设置的题目默认配置对象(options)的"'+ propertyName +'"'+'属性配置错误！'+addition)
          result=false
        }
        switch (propertyName){
          case 'answerIndex':
            if(typeof optionValue!=='number'){
              showError('必须为一个数字')
            }
          break;
          case 'mode':
            if(optionValue!=='default' && optionValue!=='hard' && optionValue!=='branch'){
              showError("目前只支持'default' 'hard' 'branch'三种模式")
            }
          break;
          case 'option':
            if(! (optionValue instanceof Array)){
              showError('必须为一个数组')
            }
          break;
          case 'endMessage':
            if(typeof optionValue!=='string'){
              showError('该属性必须为字符串')
            }else{
              if(optionValue.length===0){
                showError('字符串长度不能为0')
              }
            }
          break;
          default:
            console.error('vue-paper不支持你所配置的题目默认配置对象（options）配置属性："'+propertyName+'"')
            result=false
          break;
        }
      })
      return result
    },
    assginOptions (){
      Object.assign(finalOptions,this.defaultOptions,this.userOptions)
    },
    addDefaults (question){
      let options={...finalOptions}
      items.push(Object.assign(options,question))
    }
  })

  if(main.checkUserOptions()){//用户传递的默认项没有错误则混合默认项和用户配置项
    main.assginOptions()

    questions.forEach((question)=>{//给题目对象填充默认值
      main.addDefaults(question)
    })
  }
}
