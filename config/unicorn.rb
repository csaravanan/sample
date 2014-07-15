#set the working application directory
working_directory "/home/fixnix/audit"

# Unicorn PID file location
pid "/home/fixnix/audit/tmp/pids/unicorn.pid"

# Path to logs
# stderr_path "/path/to/log/unicorn.log"
# stdout_path "/path/to/log/unicorn.log"
stderr_path "/home/fixnix/audit/log/unicorn_error.log"
stdout_path "/home/fixnix/audit/log/unicorn.log"

# Unicorn socket
#unix:///var/www/apps/inquirly/current/tmp/sockets/unicorn_production.sock;
listen "/home/fixnix/audit/tmp/sockets/unicorn_production.sock"

preload_app true

# Number of processes
worker_processes 4

# Time-out
timeout 600

