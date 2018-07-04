FROM node:carbon

WORKDIR /usr/src/dittnav

COPY ./ ./

RUN npm install && npm run build

EXPOSE 8080

CMD ["npm", "run", "server"]
