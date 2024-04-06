import puppeteer from "puppeteer";
import jsdom from "jsdom";

(async () => {
    try {
        // Abrimos una instancia del puppeteer y accedemos a la url de google
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const response = await page.goto("https://www.bna.com.ar/Personas");
        const body = await response.text();

        // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
        const {
            window: { document },
        } = new jsdom.JSDOM(body);

        const data = [];

        // Seleccionamos los tbody
        const $TrAll = document.querySelectorAll(
            "#billetes > table > tbody  tr"
        );

        $TrAll.forEach((element) => {
            data.push({
                tipo: element.children[0].innerHTML,
                Compra: element.children[1].innerHTML,
                venta: element.children[2].innerHTML,
            });
        });

        console.log(data);

        // Cerramos el puppeteer
        await browser.close();
    } catch (error) {
        console.error(error);
    }
})();
