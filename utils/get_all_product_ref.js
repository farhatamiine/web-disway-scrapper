const { delay } = require('./function')
const puppeteer = require('puppeteer');
const chalk = require('chalk');
exports.getAllProductRef = async (LINKS) => {
    console.log(chalk.green("Getting product link..."));
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { isLandscape: true, width: 1366, height: 768 }
    });
    const products = [];
    const page = await browser.newPage();
    await page.goto(LINKS, { waitUntil: 'networkidle2' })
    await page.select("select#ctl00_cpholder_ctl00_ChildItems_PageSizectl_dlPageSize", "9999")
    console.log(chalk.green("Waiting for filter..."));
    await delay(10000);
    console.log(chalk.green("Done"));
    const option = await page.$$eval("span#spnShortDescription", a => a.length);
    for (let index = 0; index < option; index++) {
        let selector = index < 9 ? "#ctl00_cpholder_ctl00_ChildItems_rptchilditems_ctl0" + index + "_Hk2" : "#ctl00_cpholder_ctl00_ChildItems_rptchilditems_ctl" + index + "_Hk2"
        const ref = await page.$$eval(selector, r => r.map(s => s.href));
        products.push(ref[0])
    }
    browser.close()
    return products.filter(function (el) {
        return el != null;
    });
};
