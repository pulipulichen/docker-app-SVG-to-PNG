FROM node:18.12.1-buster

RUN apt-get update

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
RUN wget -O /noto.woff https://fonts.cdnfonts.com/s/107410/NotoSansTC[wght].woff
RUN apt-get install -y fonts-noto-cjk
RUN fc-cache -fv
