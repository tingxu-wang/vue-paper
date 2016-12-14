var path=require('path')

module.exports={
  entry:'./src/index.js',
  output:{
    path:'./dist',
    filename:'index.js'
  },
  resolve:{
    extensions:['','.js','.vue']//解析
  },
/*  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },*/
  module: {
    loaders: [{
      test: /\.js$/,
      exclude:path.join(__dirname,'node_modules'),
      loader: 'babel',
      include:path.join(__dirname,'src')
    },{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'html'
    }]
  },
  vue: {
    loaders: {
        css: 'style!css!autoprefixer',
        html:'html-loader'
    }
  },
  babel: {
      presets: ['es2015'],
      plugins: ['transform-runtime']
  }
}
