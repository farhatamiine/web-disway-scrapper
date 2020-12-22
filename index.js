const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

async function getAllProductRef(LINKS) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { isLandscape: true, width: 1366, height: 768 }
    });
    const page = await browser.newPage();
    await page.goto(LINKS, { waitUntil: 'networkidle2' })
    await page.select("select#ctl00_cpholder_ctl00_ChildItems_PageSizectl_dlPageSize", "9999")
    console.log("Done 1");
    await delay(10000);
    console.log("Done 2");
    const products = [];
    const option = await page.$$eval("span#spnShortDescription", a => a.length);
    console.log(option);
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

console.table(getAllProductRef("https://www.disway.com/productdetails.aspx?id=20000034&itemno=MASTER_TAB_SMARTPHON").then(e => console.log(e)))