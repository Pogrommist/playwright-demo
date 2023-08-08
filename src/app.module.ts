import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaywrightService } from './playwright/playwright.service';
import { PlaywrightController } from './playwright/playwright.controller';

@Module({
  imports: [],
  controllers: [AppController, PlaywrightController],
  providers: [AppService, PlaywrightService],
})
export class AppModule {}
