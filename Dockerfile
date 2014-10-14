FROM totem/nodejs-base:0.10.x-trusty

ADD . /opt/whyaz

WORKDIR /opt/whyaz

RUN npm install -g bower gulp

RUN npm install
RUN bower --allow-root install

EXPOSE 8080

ENV DISCOVER whyaz:8080

ENTRYPOINT ["gulp"]
CMD ['--help']