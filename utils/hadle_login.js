const chalk = require('chalk');
exports.handleLogin = async (page) => {
    console.log(chalk.green("Starting Login to Disway"));
    await page.goto('https://www.disway.com/login.aspx');
    await page.type('#txtUserName', 'mghamir6883');
    await page.type('#ctl00_cpholder_txtPassword', 'MG68AMR@2018@2019');
    await Promise.all([
        page.waitForNavigation(),
        page.click('#ctl00_cpholder_bLogin'),
    ]);
};
