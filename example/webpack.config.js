var path=require('path')

module.exports={
  entry:'./src/index.js',
  output:{
    path:'./dist',
    filename:'index.js'
  },
  resolve:{
    extensions:['','.js','.vue'],//解析
    alias:{
      STATIC:path.join(__dirname,'static'),
      PRJ_ROOT:path.join(__dirname,'..')
    }
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    },{
      test: /\.js$/,
      //exclude:path.join(__dirname,'node_modules'),
      loader: 'babel',
      include:[path.join(__dirname,'src'),path.join(__dirname,'..','src')]
    }]
  },
  babel: {
      presets: ['es2015'],
      plugins: ['transform-runtime']
  }
}
