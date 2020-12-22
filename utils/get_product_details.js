//! Get single product details
async function getProductDetails(link, page) {
    await page.goto(link, { waitUntil: 'networkidle2' });
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
    };
}
exports.getProductDetails = getProductDetails;

