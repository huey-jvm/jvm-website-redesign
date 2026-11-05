import { test, expect } from "@playwright/test";

for (const viewport of [{width:320,height:568},{width:390,height:844},{width:844,height:390}]) {
  test(`mobile menu and contact flow at ${viewport.width}x${viewport.height}`, async ({page}) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.locator("header").getByRole("button",{name:"Contact",exact:true}).click();
    const dialog=page.getByRole("dialog",{name:"Start a conversation"});
    await expect(dialog).toBeVisible();
    const close=dialog.getByRole("button",{name:"Close",exact:true});
    await expect(close).toBeInViewport();
    await dialog.getByText("Something else",{exact:true}).click();
    await dialog.getByLabel(/^Name/).fill("Mobile review");
    await dialog.getByRole("textbox",{name:/^Email/}).fill("review@example.com");
    await dialog.getByLabel(/^Message/).fill("Local interface check only.");
    const send=dialog.getByRole("button",{name:"Send message"});
    await send.scrollIntoViewIfNeeded();
    await expect(send).toBeInViewport();
    await expect(close).toBeInViewport();
    await page.screenshot({path:`test-results/mobile-contact-${viewport.width}.png`});
    await close.click();
    await expect(dialog).not.toBeVisible();
    await page.getByRole("button",{name:"Open menu",exact:true}).click();
    const menu=page.getByRole("dialog",{name:"Menu",exact:true});
    await menu.getByRole("link",{name:"About JVM",exact:true}).click();
    await expect(menu).not.toBeVisible();
    const title=page.getByRole("heading",{level:1});
    await expect(title).toHaveText("About JVM Solutions");
    await expect.poll(async()=> (await title.boundingBox())!.y).toBeGreaterThanOrEqual(61);
    await page.getByRole("button",{name:"Open menu",exact:true}).click();
    await menu.getByRole("button",{name:"Partner With Us",exact:true}).click();
    await menu.getByRole("link",{name:"Become a Partner",exact:true}).click();
    await expect(page).toHaveURL(/work-with-us#partners/);
    await expect(menu).not.toBeVisible();
    // Same-page anchor selections must dismiss the menu too.
    await page.getByRole("button",{name:"Open menu",exact:true}).click();
    if(await menu.getByRole("button",{name:"Partner With Us",exact:true}).getAttribute("aria-expanded")!=="true") await menu.getByRole("button",{name:"Partner With Us",exact:true}).click();
    await menu.getByRole("link",{name:"Become a Partner",exact:true}).click();
    await expect(menu).not.toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  });
}

test("mobile careers action and service sequence are reachable", async ({page})=>{
  await page.setViewportSize({width:320,height:568});
  await page.goto('/careers');
  const jobs=page.locator('.image-hero').getByRole('link',{name:/View open roles/});
  await expect(jobs).toBeVisible();
  await expect(jobs).toHaveAttribute('href',/^https:/);
  await page.goto('/services');
  await expect(page.locator('.service-entry-image:visible')).toHaveCount(4);
  const next=page.getByRole('navigation',{name:'Next service page'});
  await expect(next).toHaveCount(0);
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(next).toBeVisible();
  await next.getByRole('link').click();
  await expect(page).toHaveURL(/healthcare-operations/);
  await expect(page.getByRole('heading',{level:1})).toBeInViewport();
});

test("mobile service explorer and capability previews remain usable", async ({page})=>{
  await page.setViewportSize({width:320,height:568});
  await page.goto('/why-jvm');
  const group=page.getByRole('group',{name:'Explore service areas'});
  await group.getByRole('button',{name:'Health IT',exact:true}).click();
  const detail=page.getByRole('region',{name:'Selected service contribution'});
  await expect(detail.getByRole('heading',{name:'Systems that support the people'})).toBeVisible();
  await expect(detail.getByRole('link',{name:'Explore Health IT'})).toHaveAttribute('href','/services/health-it');
  await page.goto('/contracting/capability-statement');
  const preview=page.getByRole('link',{name:/^Preview PDF:/}).first();
  await preview.scrollIntoViewIfNeeded();
  await expect(preview).toBeInViewport();
  await expect(preview).toHaveAttribute('target','_blank');
  const bounds=await preview.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x+bounds!.width).toBeLessThanOrEqual(320);
});
