#!/usr/bin/env bash
DIR=`pwd`
NODE=`which node`
# get action
ACTION=$1
# help
usage(){
    echo "Usage: ./appctl.sh {start|stop|restart}"
    exit 1;
}
get_pid(){
    now_pids=`ps -ef|grep "run.js"|grep -v grep|awk ' ''{print $2}'`
    echo $now_pids
}
# start app
start(){
    pids=`get_pid`
    if [ ! -z $pids ]; then
        echo 'server is already running'
    else
#        $NODE $DIR/run.js 2>&1 &
        PORT=3000 NODE_ENV=production nohup node $DIR/run.js  > output 2>&1 &
        echo 'server is running at port:3000 runmod:production'
    fi
}
# stop app
stop(){
    now_pids=`get_pid`
    if [ -z $now_pids ]; then
        echo 'server not running'
    else
        echo 'server is stopping ...'
        for now_pid in ${now_pids};do
            echo "kill pid:${now_pid}"
            kill -15 ${now_pid}
        done
        echo 'server stopped!'
    fi
}
# restart app
restart(){
    stop
    sleep 0.5
    echo =====
    start
}
case "$ACTION" in
    start)
        start
    ;;
    stop)
        stop
    ;;
    restart)
        restart
    ;;
    *)
        usage
    ;;
esac