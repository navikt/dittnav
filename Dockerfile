FROM docker.adeo.no:5000/pus/decorator

WORKDIR /usr/src/dittnav

COPY ./ ./

# CMD ["npm", "run", "server"]
