import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AtGuard } from './common/guards/at.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DataModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
