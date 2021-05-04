import { chromium, Browser, Page } from "playwright";

let browser: Browser;
let page: Page;

const buyMilk = "buy milk";

jest.setTimeout(20000);

beforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
});

beforeEach(async () => {
  page.reload();
});

test(`add ${buyMilk}`, async () => {
  await page.fill("data-testid=item-input", buyMilk);

  await page.click("[data-testid=button-submit]");

  const itemContent = await page.textContent("data-testid=item-1");

  expect(itemContent).toBe(buyMilk);
});

test(`remove ${buyMilk}`, async () => {
  await page.fill("data-testid=item-input", buyMilk);

  await page.click("[data-testid=button-submit]");

  await page.click("data-testid=item-1");

  const itemContent = await page.$("data-testid=item-1");

  expect(itemContent).toBeNull();
});

["buy drinks", "buy sandwich"].forEach((testItem, index) => {
  test(`Add '${testItem}'`, async () => {
    await page.fill("data-testid=item-input", testItem);

    await page.click("[data-testid=button-submit]");

    const itemContent = await page.textContent(`data-testid=item-${index + 1}`);

    expect(itemContent).toBe(testItem);
  });

  test(`Remove '${testItem}'`, async () => {
    await page.fill("data-testid=item-input", testItem);

    await page.click("[data-testid=button-submit]");

    await page.click(`data-testid=item-${index + 1}`);

    const itemContent = await page.$(`data-testid=item-${index + 1}`);

    expect(itemContent).toBeNull();
  });
});

test("add many", () => {
  ["buy drinks", "buy milk", "buy sandwich"].forEach(
    async (testItem, index) => {
      await page.fill("data-testid=item-input", testItem);

      await page.click("[data-testid=button-submit]");

      await page.fill("data-testid=item-input", "");

      const itemContent = await page.textContent(
        `data-testid=item-${index + 1}`
      );

      expect(itemContent).toBe(testItem);
    }
  );
});
test("remove many", async () => {
  await Promise.all(
    ["buy drinks", "buy milk", "buy sandwich"].map(async (testItem, index) => {
      await page.fill("data-testid=item-input", testItem);

      await page.click("[data-testid=button-submit]");

      await page.fill("data-testid=item-input", "");
    })
  );

  await Promise.all(
    ["buy drinks", "buy milk", "buy sandwich"].map(async (testItem, index) => {
      await page.click(`data-testid=item-${index + 1}`);

      const itemContent = await page.$(`data-testid=item-${index + 1}`);

      expect(itemContent).toBeNull();
    })
  );
});

afterAll(async () => {
  await browser.close();
});
