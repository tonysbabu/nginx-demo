# nginx-demo
A web/express app to test out nginx capabilities

#Step1
- Install nginx
  - brew install nginx

#Step 2
- Update /opt/homebrew/etc/nginx/nginx.conf file to run http server listening on port 8080 with root pointing to project path
http {
    server {
        listen 8080;
        root /Users/t0s0afd/Documents/Learning/nginx-learn;
    }
}

#Step 3
- Support for css
``http {
    include mime.types;
    server {
        listen 8080;
        root /Users/t0s0afd/Documents/Learning/nginx-learn;
    }
}``

#Step 4
- Support /fruits route
http {
    include mime.types;
    server {
        listen 8080;
        root /Users/t0s0afd/Documents/Learning/nginx-learn;
         location /fruits {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
        }
    }
}

#Step5
- Support /carbs alias to load /fruits
http {
    include mime.types;
    server {
        listen 8080;
        root /Users/t0s0afd/Documents/Learning/nginx-learn;
         location /fruits {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
        }
        location /carbs {
            alias /Users/t0s0afd/Documents/Learning/nginx-learn/fruits;
        }
    }
}

#Step6
- Support non index.html routes eg support route /vegetables/veggie.html
http {
    include mime.types;
    server {
        listen 8080;
        root /Users/t0s0afd/Documents/Learning/nginx-learn;
         location /fruits {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
        }
        location /carbs {
            alias /Users/t0s0afd/Documents/Learning/nginx-learn/fruits;
        }
        location /vegetables {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
            try_files /vegetables/veggies.html /index.html =404;
        }
    }
}

#Step7
- URL /crops to redirect to /vegetables
http {
    include mime.types;
    server {
        listen 8080;
        root /Users/t0s0afd/Documents/Learning/nginx-learn;
         location /fruits {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
        }
        location /carbs {
            alias /Users/t0s0afd/Documents/Learning/nginx-learn/fruits;
        }
        location /vegetables {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
            try_files /vegetables/veggies.html /index.html =404;
        }
        location /crops {
            return 307 /vegetables;
        }
    }
}

#Step8
- Regex routes(eg /count/[0-9] to load /index.html
http {
    include mime.types;
    server {
        listen 8080;
        root /Users/t0s0afd/Documents/Learning/nginx-learn;
         location /fruits {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
        }
        location /carbs {
            alias /Users/t0s0afd/Documents/Learning/nginx-learn/fruits;
        }
        location /vegetables {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
            try_files /vegetables/veggies.html /index.html =404;
        }
        location /crops {
            return 307 /vegetables;
        }
        location ~* /count/[0-9] {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
            try_files /index.html =404;
        }
    }
}

#Step9
- Rewrite (eg /number/[0-9] loads /count
http {
    include mime.types;
    server {
        listen 8080;
        root /Users/t0s0afd/Documents/Learning/nginx-learn;
        rewrite ^/number/(\w+) /count/$1;
        location /fruits {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
        }
        location /carbs {
            alias /Users/t0s0afd/Documents/Learning/nginx-learn/fruits;
        }
        location /vegetables {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
            try_files /vegetables/veggies.html /index.html =404;
        }
        location /crops {
            return 307 /vegetables;
        }
        location ~* /count/[0-9] {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
            try_files /index.html =404;
        }
    }
}

##Step10
- Load balancing
  - Install docker
     - brew install --cask docker
   
  - Create express app running in 7777 and a docker file
  - Build the docker image
    -  docker build . -t myserver
   
  - Run docker image with port mapping to run application in 1111, 2222, 3333 ,4444
    - docker run -p 1111:7777 -d myserver
    - docker run -p 2222:7777 -d myserver  etc
   
  - Update nginx.cong to proxypass localhost:8080 to containers running in 1111, 2222, 3333 ,4444 in round robin fashion
    http {
    include mime.types;
     upstream backendserver {
        server 127.0.0.1:1111;
        server 127.0.0.1:2222;
        server 127.0.0.1:3333;
        server 127.0.0.1:4444;
    }
    server {
        listen 8080;
        root /Users/t0s0afd/Documents/Learning/nginx-learn;
        rewrite ^/number/(\w+) /count/$1;
        location / {
            proxy_pass http://backendserver;
        }
        location /fruits {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
        }
        location /carbs {
            alias /Users/t0s0afd/Documents/Learning/nginx-learn/fruits;
        }
        location /vegetables {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
            try_files /vegetables/veggies.html /index.html =404;
        }
        location /crops {
            return 307 /vegetables;
        }
        location ~* /count/[0-9] {
            root /Users/t0s0afd/Documents/Learning/nginx-learn;
            try_files /index.html =404;
        }
    }
}


##Thats it

