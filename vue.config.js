module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
        },
    },


    // 关闭语法检查
    lintOnSave: false

}

//打包配置文件
module.exports = {
    assetsDir: 'static',
    parallel: false,
    publicPath: './',
};

module.exports = {
    devServer: {
        proxy: {
            '/user':{
                target: 'http://localhost:8081',
                changeOrigin: true,
                ['^/user']:'',
            },
            '/repair':{
                target: 'http://localhost:8081',
                changeOrigin: true,
                ['^/repair']:'',
            },
            '/device':{
                target: 'http://localhost:8081',
                changeOrigin: true,
                ['^/device']:'',
            },
            '/scrap':{
                target: 'http://localhost:8081',
                changeOrigin: true,
                ['^/scrap']:'',
            },

        }
    },

    }

