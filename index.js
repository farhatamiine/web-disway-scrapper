const puppeteer = require('puppeteer');

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
    await page.goto("https://www.disway.com/productdetails.aspx?id=20000020&itemno=MASTER_DESKTOP&filter=2000000357")
    await page.evaluate(() => {
        const example = document.querySelector('#ctl00_cpholder_ctl00_ChildItems_PageSizectl_dlPageSize');
        const example_options = example.querySelectorAll('option');
        const selected_option = [...example_options].find(option => option.text === 'Tous');
        selected_option.selected = true;
    });
    await page.screenshot({ path: "screenshoot.png" });
})();