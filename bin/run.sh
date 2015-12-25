

now_pids=`/bin/ps -ef|grep "run.js"|grep -v grep|awk ' ''{print $2}'`
for now_pid in ${now_pids};do
    echo "kill pid:${now_pid}"
    /bin/kill ${now_pid}
done

PORT=3000 NODE_ENV=production nohup node run.js >> 3000.log &
PORT=3001 NODE_ENV=production nohup node run.js >> 3001.log &
PORT=3002 NODE_ENV=production nohup node run.js >> 3002.log &
PORT=3003 NODE_ENV=production nohup node run.js >> 3003.log &
PORT=3004 NODE_ENV=production nohup node run.js >> 3004.log &
