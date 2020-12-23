const { delay } = require('./function')
const puppeteer = require('puppeteer');
const chalk = require('chalk');
const fs = require('fs')
const { v4 } = require('uuid')

let imgConvert = require('image-convert');

getProductSliderImages = async (LINKS, page) => {
    await page.goto(LINKS, { waitUntil: 'networkidle2' })
    try {
        if (await page.waitForSelector(".-icecat-ajaxImg", { timeout: 5000 })) {
            const refs = await page.$$eval('.-icecat-ajaxImg', r => r.map(s => ({ "width": s.naturalWidth, "src": s.src })));
            for (let index = 0; index < refs.length; index++) {
                if (refs[index].width >= 400) {
                    imgConvert.fromBuffer({
                        buffer: refs[index].src,
                        quality: 50, //quality
                        output_format: "jpg", //jpg
                        size: "original"
                    }, function (err, response, file) {
                        if (!err) {
                            fs.writeFile("img/" + v4() + ".png", response, () => { })
                        } else {
                            res.json({
                                "Error": err.message
                            })
                        }
                    });
                }
            }
        } else {
            console.log(chalk.red("Element not found"));
        }
    } catch (error) {
        console.log("The element didn't appear.")
    }

}



exports.getProductSliderImages = getProductSliderImages;
