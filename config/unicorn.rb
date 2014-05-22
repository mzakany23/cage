working_directory "/vagrant/cage"
pid "/vagrant/cage/tmp/pids/unicorn.pid"
stderr_path "/vagrant/cage/log/unicorn.log"
stdout_path "/vagrant/cage/log/unicorn.log"

# listen "/tmp/sockets/unicorn.cage.sock"
listen 3000
listen 80

worker_processes 2
timeout 30
