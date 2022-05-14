# syntax=docker/dockerfile:1

FROM node:12.18.1

WORKDIR /

COPY . .
RUN npm install --production
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
CMD ["provider"]
