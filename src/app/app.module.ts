import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { mongooseConfig, mongoUri } from '@/config/mongoose.config';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from '@/modules/messages/messages.module';
import { TransferRequirementModule } from '@/modules/transferRequirement/transferRequirement.module';
import { TransferModule } from '@/modules/transfers/transfer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(mongoUri, mongooseConfig),
    MessagesModule,
    TransferModule,
    TransferRequirementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
