FROM node:10

ENV PUBLIC_URL /
ENV VERSION "v1.1.0"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN ls -al
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "npm", "run", "serve" ]
