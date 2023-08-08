// playwright.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PlaywrightService } from './playwright.service';

const PRICE_CATALOG_URL = 'https://vzug-shop.ru/catalog/';

@Controller('playwright')
export class PlaywrightController {
  constructor(private readonly playwrightService: PlaywrightService) {}

  @Get('example')
  async example() {
    // Change me
    const page = await this.playwrightService.createPage();
    const productName = 'WineCooler UCSL 60';

    await page.goto(`${PRICE_CATALOG_URL}?q=${productName}`);

    const searchResult = await page
      .locator('.block-item-flex')
      .evaluateAll((list) => {
        return list.map((item: HTMLTableRowElement) => {
          const name = item
            .querySelector('.item-title')
            .getElementsByTagName('span')[0].innerHTML;
          const price = Number(
            item
              .querySelector('span.price_value')
              ?.innerHTML?.replace(/ /g, ''),
          );

          return { name, price };
        });
      });

    return { message: searchResult }
  }
}
