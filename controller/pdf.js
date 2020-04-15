const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');

class Pdf {
  static async create(req, res) {
    const data = {
      title: 'Pdf de Cristobalin',
      date: new Date(),
      name: 'Cristóbal',
      lastname: 'Palma',
      age: 31,
      birthdate: '22/10',
      phrase: 'Chauchas',
    };
    const templateHtml = fs.readFileSync(path.join(process.cwd(), 'template.html'), 'utf8');
    const template = handlebars.compile(templateHtml);
    const html = template(data);

    const options = {
      headerTemplate: '<p></p>',
      footerTemplate: '<p></p>',
      displayHeaderFooter: false,
      format: 'A4',
      margin: {
        top: '10px',
        bottom: '30px',
      },
      printBackground: true,
      // path: pdfPath
    };

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
    });

    const page = await browser.newPage();

    await page.addStyleTag({
      url: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    });

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
      waitUntil: 'networkidle0',
    });

    const buffer = await page.pdf(options);
    res.type('application/pdf');
    res.send(buffer);
    browser.close();
  }
}

module.exports = Pdf;
