FROM node:carbon

WORKDIR /usr/src/dittnav

COPY ./ ./

EXPOSE 8080

CMD ["npm", "run", "server"]