const puppeteer = require('puppeteer');
const { handleLogin } = require("./utils/hadle_login")
const { getAllProductRef } = require("./utils/get_all_product_ref");
const { getProductDetails } = require("./utils/get_product_details");
const { exportToExcel } = require("./utils/function");

const chalk = require('chalk')

exports.main = async () => {
    const LINKS = "https://www.disway.com/productdetails.aspx?id=20000034&itemno=MASTER_TAB_SMARTPHON";


    //! Get all products reference
    const allLink = await getAllProductRef(LINKS)
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { isLandscape: true, width: 1366, height: 768 }
    });
    const page = await browser.newPage();
    //! Handle Login
    await handleLogin(page)
    const scrapedData = [];
    console.log(chalk.green("Getting product details..."));
    for (let link of allLink) {
        const data = await getProductDetails(link, page);
        scrapedData.push(data);
    }
    browser.close();
    //! Exporting data Login
    exportToExcel();
    console.log(chalk.green("Done !!"));
}
