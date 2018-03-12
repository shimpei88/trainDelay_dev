module.exports = {
    mode: 'development',

    entry: `./src/index.js`,

    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: 'dist',
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                        presets: [
                            ['env', {'modules': false}],
                            'react'
                        ]
                        }
                    }
                ],
                exclude: /node_modules/,
            }
        ]
    }
}