import client, { Channel, Connection } from 'amqplib';
import { Logger } from 'winston';

export interface IRabbitMq {
  serviceName: string,
  rabbitMqUrl: string
}

export async function createConnection(log: Logger, options: IRabbitMq): Promise<Channel | undefined> {
  try {
    const connection: Connection = await client.connect(`${options.rabbitMqUrl}`);
    const channel: client.Channel = await connection.createChannel();
    log.info(`${options.serviceName} connected to rabbitMq`);
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', `${options.serviceName} RabbitMq error`, error);
    return undefined;
  }
}

function closeConnection(channel: Channel, connection: Connection): void {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
}
