FROM docker.adeo.no:5000/pus/decorator
ENV APPLICATION_NAME=dittnav
ENV CONTEXT_PATH=dittnav-nais

# WORKDIR /usr/src/dittnav

COPY ./build /app

# CMD ["npm", "run", "server"]
