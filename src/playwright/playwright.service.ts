import { Injectable } from '@nestjs/common';
import { Browser, BrowserContext, Page } from 'playwright';
import * as playwright from 'playwright';

const defaultOptions = {
  headless: false,
};

interface InitBrowserOptions {
  headless?: boolean;
}

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36';

@Injectable()
export class PlaywrightService {
  browser: Browser;
  context: BrowserContext;

  async initContext(): Promise<void> {
    console.log('init context');
    this.context = this.context ?? (await this.browser.newContext());
  }

  async initBrowserAndContext(): Promise<void> {
    await this.initBrowser();
    await this.initContext();
  }

  async createPage(): Promise<Page> {
    if (this.browser == null) await this.initBrowserAndContext();
    const page = await this.browser.newPage();
    await page.setExtraHTTPHeaders({
      'User-Agent': USER_AGENT,
    });
    return page;
  }

  closePage(page: Page): Promise<void> {
    return page.close();
  }

  async initBrowser({
    headless = defaultOptions.headless,
  }: InitBrowserOptions = defaultOptions): Promise<void> {
    this.browser =
      this.browser ??
      (await playwright.chromium.launch({
        headless,
      }));
  }

  protected scrapePage(_url: string, _sourceId: number): void {
    throw Error('"scrapePage" method is not exists');
  }

  async closeContext(): Promise<void> {
    if (this.context != null) await this.context.close();
  }

  async closeBrowser(): Promise<void> {
    if (this.browser != null) await this.browser.close();
    this.browser = null;
  }
}
