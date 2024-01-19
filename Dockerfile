#FROM node:18.12.1-buster
#FROM node:21.5.0-bullseye
# FROM pudding/docker-app:node-20-inkscape-20230922-2210
FROM node:20-buster

# RUN apt-get update && \
#     apt-get install -y software-properties-common
# RUN add-apt-repository -y ppa:inkscape.dev/stable
RUN apt-get update
RUN apt-get install -y inkscape

# RUN apt-get update

# https://www.npmjs.com/package/svgexport
RUN apt-get install -y \
    imagemagick

# COPY package.json /
# RUN npm install

CMD ["bash"]

RUN apt-get install -y fontconfig fonts-wqy-zenhei
RUN fc-cache -fv
RUN apt-get install -y fonts-noto-cjk-extra
RUN fc-cache -fv

RUN apt-get install -y wget
RUN wget -O /noto.woff https://fonts.cdnfonts.com/s/107410/NotoSansTC[wght].woff
RUN apt-get install -y fonts-noto-cjk
RUN fc-cache -fv
