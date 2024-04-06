import puppeteer from "puppeteer";

(async () => {
    try {
        // Abrimos una instancia del puppeteer y accedemos a la url de google
        const browser = await puppeteer.launch({
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-gpu",
                "--no-zygote",
            ],
        });
        const page = await browser.newPage();
        await page.setJavaScriptEnabled(true);
        await page.goto("https://www.bancoprovincia.com.ar/home/");
        // Espera a que se cargue el un div que contiene los datos a extraer
        await page.waitForSelector("div.paginas__sc-1t8sitw-1.dgBaJN"); 
        const data = await page.evaluate(() => {
            const $element = document.querySelectorAll(
                "div.paginas__sc-1t8sitw-1.dgBaJN"
            );
            return {
                venta: $element[1].innerHTML.split(" ").at(-1),
                compra: $element[2].innerHTML.split(" ").at(-1),
            };
        });
        
        console.log(data);

        await browser.close();
    } catch (error) {
        console.error(error);
    }
})();
