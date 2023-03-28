import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AtGuard } from './common/guards/at.guard';

@Module({
  imports: [DataModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
