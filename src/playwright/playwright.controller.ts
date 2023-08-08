import { Controller, Get } from '@nestjs/common';
import { PlaywrightService } from './playwright.service';
@Controller('playwright')
export class PlaywrightController {
  constructor(private readonly playwrightService: PlaywrightService) {}

  @Get('example')
  async example() {
    // Change me
    const url = 'https://google.com';
    const page = await this.playwrightService.createPage();
    await page.goto(url);

    return { message: {} };
  }
}
