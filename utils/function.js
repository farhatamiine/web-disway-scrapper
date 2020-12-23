const XLSX = require('xlsx');
const chalk = require('chalk');
delay = (time) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

exportToExcel = (scrapedData) => {
    console.log(chalk.green("Exporting to excel..."));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(scrapedData);
    XLSX.utils.book_append_sheet(wb, ws)
    XLSX.writeFile(wb, "products.xlsx", { Props: { Author: "Amine Farhat" } })
}

module.exports = {
    delay: delay,
    exportToExcel: exportToExcel
}
