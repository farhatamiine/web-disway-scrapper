const puppeteer = require('puppeteer');
const chalk = require('chalk');
const XLSX = require('xlsx');

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
//! Get single product details
async function getProductDetails(link, page) {
    await page.goto(link, { waitUntil: 'networkidle2' })
    const title = await page.$eval(".h1rating", title => title.textContent);
    const reference = await page.$eval("#ctl00_cpholder_ctl00_lProductID", reference => reference.textContent);
    const remise = await page.$eval("#ctl00_cpholder_ctl00_lYouSaved", remise => remise.textContent);
    const ourprice = await page.$eval("#ctl00_cpholder_ctl00_lYourPrice", ourprice => ourprice.textContent);
    const disponible = await page.$eval("#ctl00_cpholder_ctl00_lStatus", disponible => disponible.textContent);
    const price = await page.$eval("span#ctl00_cpholder_ctl00_lWebPrice", price => price.innerText);
    const image = await page.$eval("#photoslider", image => image.src);
    return {
        title: title,
        reference: reference,
        price: price,
        remise: remise,
        ourprice: ourprice,
        disponible: disponible,
        image: image
    }
};


//! Get all products reference
async function getAllProductRef(LINKS) {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { isLandscape: true, width: 1366, height: 768 }
    });
    const products = [];
    const page = await browser.newPage();
    await page.goto(LINKS, { waitUntil: 'networkidle2' })
    await page.select("select#ctl00_cpholder_ctl00_ChildItems_PageSizectl_dlPageSize", "9999")
    console.log(chalk.red("Waiting for filter..."));
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

//! Handle Login
async function handleLogin(page) {
    console.log(chalk.red("Login to Disway"));
    await page.goto('https://www.disway.com/login.aspx');
    await page.type('#txtUserName', 'mghamir6883');
    await page.type('#ctl00_cpholder_txtPassword', 'MG68AMR@2018@2019');
    await Promise.all([
        page.waitForNavigation(),
        page.click('#ctl00_cpholder_bLogin'),
    ]);
}


async function main() {
    const LINKS = "https://www.disway.com/productdetails.aspx?id=20000034&itemno=MASTER_TAB_SMARTPHON";
    console.log(chalk.red("Getting product link..."));
    const allLink = await getAllProductRef(LINKS)
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { isLandscape: true, width: 1366, height: 768 }
    });
    const page = await browser.newPage();
    await handleLogin(page)
    const scrapedData = [];
    console.log(chalk.red("Getting product details..."));
    for (let link of allLink) {
        const data = await getProductDetails(link, page);
        scrapedData.push(data);
    }
    browser.close();
    console.log(chalk.red("Exporting to excel..."));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(scrapedData);
    XLSX.utils.book_append_sheet(wb, ws)
    XLSX.writeFile(wb, "products.xlsx")
    console.log(chalk.red("Done"));
}

main();