##nginx blog +code-server

```
location /codeserver/ {
                proxy_pass   http://127.0.0.1:8080/;
                proxy_set_header Host $host;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection upgrade;
                proxy_set_header Accept-Encoding gzip;
        }
        location /blog/ {
            proxy_pass http://172.24.54.40:3000;
        }
```
###全局vite
sudo npm i --unsafe-perm -g vite

###sudo 使用npm 和node   -f强制
sudo ln -s /usr/local/bin/npm /usr/bin/npm
sudo ln -s /usr/local/bin/node /usr/bin/node

###code-server启动服务
code-server
sudo systemctl enable --now code-server@$USER

###vite.config.js  修改base
###vue-router修改base