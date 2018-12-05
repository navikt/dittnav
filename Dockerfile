FROM docker.adeo.no:5000/pus/decorator

# WORKDIR /usr/src/dittnav

COPY ./ /app

# CMD ["npm", "run", "server"]
