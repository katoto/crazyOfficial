module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: 'crazy_qqsd',
            script: 'server.js',
            env: {
                COMMON_VARIABLE: 'true'
            }
        }

    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: 'xiezg',
            host: '192.168.41.76',
            ref: 'origin/master',
            'ssh_options': ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
            repo: 'service@10.0.0.31:/home/service/touch/crazy_qqsd.git',
            path: '/home/xiezg/crazybet_500qqsd',
            'post-deploy': 'cnpm install &&npm run build && pm2 startOrRestart ecosystem.config.js --env production',
            env: {
                'NODE_ENV': 'production'
            }
        },
        development: {
            user: 'xiezg',
            host: '192.168.41.76',
            ref: 'origin/master',
            'ssh_options': ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
            repo: 'service@10.0.0.31:/home/service/touch/crazy_qqsd.git',
            path: '/home/xiezg/crazybet_500qqsd',
            'post-deploy': 'cnpm install && pm2 startOrRestart ecosystem.config.js --env development',
            env: {
                'NODE_ENV': 'development'
            }
        }

    }
}
