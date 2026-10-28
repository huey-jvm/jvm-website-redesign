import { test, expect } from "@playwright/test";

test("revision navigation and mobile audience paths", async ({ page }) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/", {waitUntil:"domcontentloaded"});
  const nav=page.locator('header nav[aria-label="Primary"]');
  await expect(nav.locator(':scope > ul > li')).toHaveCount(5);
  await expect(nav.locator(':scope > ul > li').first()).toHaveText("About JVM");
  await expect(page.locator('main h1')).toContainText("Your Mission");
  await expect(page.locator('[data-hero]')).not.toContainText("STARS III");
  await expect(page.locator('footer')).toContainText("7550 W I-10");
  await page.setViewportSize({width:375,height:812});
  await page.getByRole('button',{name:'Open menu',exact:true}).click();
  await page.getByRole('dialog',{name:'Menu',exact:true}).getByRole('link',{name:'Work With Us',exact:true}).click();
  await expect(page).toHaveURL(/work-with-us/);
  await expect(page.locator('main').getByRole('link',{name:'Join Our Team',exact:true})).toHaveAttribute('href','/careers');
  await expect(page.locator('main').getByRole('link',{name:'Email Business Development'})).toHaveAttribute('href',/^mailto:BD@jvmsolutions.net/);
});

test("service pages show content without redundant service navigation", async ({page})=>{
  for(const slug of ['healthcare-operations','health-it','logistics','facilities-management','management-support']) {
    await page.goto('/services/'+slug,{waitUntil:'domcontentloaded'});
    const index=page.getByRole('navigation',{name:'Service index'});
    await expect(index).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText(/staffing/i);
    await expect(page.locator('.capability-library a')).not.toHaveCount(0);
  }
  await page.goto('/services/logistics-facilities');
  await page.getByRole('link',{name:'Explore Facilities Management',exact:true}).click();
  await expect(page).toHaveURL(/services\/facilities-management/);
});

test("supplied portraits and leadership order without invented roles",async({page})=>{
  await page.goto('/about',{waitUntil:'domcontentloaded'});
  await expect(page.locator('main')).not.toContainText('Roy White');
  for(const name of ['Deja','Jennifer','Les']) await expect(page.getByRole('heading',{name,exact:true})).toBeVisible();
  expect(await page.locator('#leadership').evaluate(el=>Boolean(el.compareDocumentPosition(document.querySelector('#mission')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  await expect(page.locator('img[data-image-src="/images/revision/deja.webp"]')).toBeVisible();
});

for(const width of [375,1440])test(`revision visual and image checks ${width}`,async({page})=>{
  await page.setViewportSize({width,height:1000});
  for(const route of ['/','/about','/services','/services/facilities-management','/work-with-us']) {
    await page.goto(route,{waitUntil:'domcontentloaded'});await page.evaluate(()=>document.fonts.ready);
    for(const img of await page.locator('main img').all()) {
      if (!(await img.isVisible())) continue;
      await img.scrollIntoViewIfNeeded();
      await expect.poll(()=>img.evaluate(el=>(el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth>0)).toBe(true);
      expect(await img.getAttribute('data-image-src')).not.toMatch(/\/images\/services\//);
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({path:`test-results/revision-${route.replaceAll('/','_')||'home'}-${width}.png`,fullPage:false});
  }
});
