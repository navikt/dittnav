FROM docker.adeo.no:5000/pus/decorator
ENV APPLICATION_NAME=dittnav-nais

# WORKDIR /usr/src/dittnav

COPY ./ /app

# CMD ["npm", "run", "server"]
