FROM node:18

WORKDIR ./
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY . .

RUN npm install
RUN npm run build

RUN rm -rf src

RUN rm -rf node_modules

RUN npm install --production

EXPOSE 8080

CMD ["/bin/sh", "-c", "npm start"]

