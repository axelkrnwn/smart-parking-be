import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from "@nestjs/core";
import { SeederModule } from "./seeder/seeder.module";
import { Seeder } from "./seeder/seeder";
import { Logger } from "@nestjs/common";

async function bootstrap() {
    NestFactory.createApplicationContext(SeederModule)
      .then(appContext => {
        const seeder = appContext.get(Seeder);
        const logger = appContext.get(Logger);
        seeder
          .seed()
          .then((e) => {
            logger.debug('Seeding complete!');
          })
          .catch(error => {
            logger.error(`Seeding failed! Error: ${error}`);
            throw error;
          })
          .finally(() => appContext.close());
      })
      .catch(error => {
        throw error;
      });
  }
  bootstrap();