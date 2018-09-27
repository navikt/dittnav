FROM docker.adeo.no:5000/pus/node
#FROM node:carbon #use this when building the container locally

WORKDIR /usr/src/dittnav

COPY ./ ./

RUN git config --global http.sslverify false
RUN npm install && npm run build

EXPOSE 8080

CMD ["npm", "run", "server"]
#ENV APPLICATION_NAME=dittnav
#COPY --from=builder /usr/src/dittnav /app