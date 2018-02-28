module.exports = {
    parser: false,
    map: false,
    from: './src/assets/css/main.css',
    to: '',
    plugins: {
        "postcss-import": {},
        "postcss-simple-vars": {},
        "postcss-extend": {},
        "postcss-nested": {},
        "postcss-mixins": {},
        "postcss-sassy-mixins": {
            mixins: {
                flexcenter: {
                    '&': {
                        display: 'flex',
                        'align-items': 'center'
                    }

                },
                shadow: {
                    '&': {
                        'box-shadow': '0px 1px 3px rgba(0, 0, 0, .3)'
                    }
                },
                boxTitle: {
                    '&': {
                        position: 'relative',
                        background: '#fafbfb',
                        height: '40px',
                        'line-height': '40px',
                        'padding-left': '16px'
                    }
                }
            }
        },
        "postcss-cssnext": {
            browsers: ['last 2 versions', '> 5%'],
            features: {
                customProperties: {
                    preserve: true,
                    variables: {},
                    appendVariables: true
                }
            }
        },
        "postcss-font-magician": {
            custom: {
                'iconfont': {
                    variants: {
                        normal: {
                            400: {
                                url: {
                                    woff: './src/assets/css/common/fonts/iconfont.woff',
                                    ttf: './src/assets/css/common/fonts/iconfont.ttf',
                                    eot: './src/assets/css/common/fonts/iconfont.eot',
                                    svg: './src/assets/css/common/fonts/iconfont.svg'
                                }
                            }
                        }
                    }
                }
            }
        },
        "postcss-url": { url: 'inline' },
        "postcss-reporter": {}
    }
}
