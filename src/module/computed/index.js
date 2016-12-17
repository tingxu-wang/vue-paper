import DataCompile from './dataCompile'

const computed={
  items (){
    let questions=[...this.msg]//复制得到的问题信息
    let options={...this.options}//复制得到的默认设置信息

    return new DataCompile(questions,options)//返回值应当是填充过默认值后的数据对象
  }
}

export default computed
