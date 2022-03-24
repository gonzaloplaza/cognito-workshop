import { Container } from '@adapter/container';
import { Server } from '@adapter/server';
import { Configuration } from '@config';

const container = new Container();
const server = container.invoke().resolve<Server>('server');
const config = container.invoke().resolve<Configuration>('config');

server
  .start()
  .then(async () => {
    console.log(`Environment: ${config.NODE_ENV}`);
    console.log(`Log level: ${config.APP_LOG_LEVEL}`);
  })
  .catch((err: Error) => {
    console.log(err);
    process.exit(1);
  });
