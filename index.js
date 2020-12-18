const puppeteer = require('puppeteer');

let products = [{}];

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { isLandscape: true, width: 1366, height: 768 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.disway.com/login.aspx');
    await page.type('#txtUserName', 'mghamir6883');
    await page.type('#ctl00_cpholder_txtPassword', 'MG68AMR@2018@2019');
    const [response] = await Promise.all([
        page.waitForNavigation(), // The promise resolves after navigation has finished
        page.click('#ctl00_cpholder_bLogin')// Clicking the link will indirectly cause a navigation
    ]);
    await page.goto("https://www.disway.com/productdetails.aspx?id=20000026&itemno=MASTER_PC_PORTABLES&filter=2000000277")
    await page.select("select#ctl00_cpholder_ctl00_ChildItems_PageSizectl_dlPageSize", "9999")

    for (const parent of await page.$$('div.div-table-row')) {
        for (const child of await parent.$$('div.div-table-col.col-text.col-item.text-left')) {
            await child.$("span#spnShortDescription").getProperty("textContent");
        }
    }
})();