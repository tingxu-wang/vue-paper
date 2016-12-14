export default {
  template:`
    {{ showTest }}
  `,
  data (){
    return {
      msg:'message'
    }
  },
  computed:{
    test (){
      return this.msg
    },
    showTest (){
      return this.test
    }
  }
}
