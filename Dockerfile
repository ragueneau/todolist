FROM node:16
USER root

##############################################################
# App
WORKDIR /opt/todolist
COPY . /opt/todolist

RUN npm install --location=global npm@8.17.0  \
  && npm install \
  && npm run build \
  && npm install -g serve

USER node

##############################################################
# Start Container
##############################################################
CMD [ "serve", "-s", "build" ]
