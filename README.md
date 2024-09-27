# Lmsweb

## Clone
```sh
git clone https://github.com/kunnoh/lms-web.git
```

Move to the app folder.
```sh
cd lms-web
```




## Docker image
Create `docker` image.
```sh
docker build -t lmsweb:latest .
```

Run docker container.
```sh
docker run -d --name lmsweb -p 80:80 lmsweb:latest
```

Stop and remove docker conatiner.
```sh
docker stop lmsweb
docker rm lmsweb
```



### Debug docker container
Run bash inside the container.
```sh
docker  exec -it <container_id | container_name> 
```

Check container logs.
```sh
docker log <container_id | container_name>
````