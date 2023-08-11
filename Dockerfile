FROM node:18.12.1-buster

RUN apt-get update

# https://www.npmjs.com/package/svgexport
RUN npm install svgexport -g

# COPY package.json /
# RUN npm install

CMD ["bash"]