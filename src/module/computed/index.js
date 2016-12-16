import DataCompile from './dataCompile'

const computed={
  items (){
    let questions=[...this.msg]//复制得到的问题信息

    //return questions
    return new DataCompile(questions).init()
  }
}

export default computed
