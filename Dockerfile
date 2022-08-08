FROM node:16
USER root

##############################################################
# App
WORKDIR /opt/todolist
COPY . /opt/todolist

# This seed has no value but it is required to build the app. #
RUN npm install --location=global npm@8.16.0  \
  && npm install \
  && npm run build \
  && npm install -g serve

USER node

##############################################################
# Start Container
##############################################################
CMD [ "serve", "-s", "build" ]
