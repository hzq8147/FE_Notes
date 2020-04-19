# **nginx.conf配置参考**

niconiworks.cn/sb 会匹配location /sb 进入404

/sakura 会匹配到location /sakura 进入

其他 /sbdflk /sakuralkjfd 和其他/abc 好像都会匹配到 location /  302重定向到/sakura 


```
server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  niconiworks.cn www.niconiworks.cn;
        root         /usr/html/;
        index        index.html index.htm;


        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location /sb {
                alias /usr/;
        }
        location /sakura {
                alias /usr/html/sakura/;
                index index.html index.htm;
        }
        location / {
                return 302 /sakura;
        }
}
```