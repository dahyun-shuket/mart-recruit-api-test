module.exports = {
    apps: [{
    name: 'mart-recruit-api',
    script: 'bin/www',
    instances: 5,
    exec_mode: 'cluster',
    wait_ready: true,
    listen_timeout: 50000,
    kill_timeout: 5000
    }]
  }