FROM node:15

RUN apt-get update
RUN apt install iputils-ping -y
RUN apt-get install net-tools -y

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]