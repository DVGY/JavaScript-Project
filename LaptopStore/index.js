const http = require("http");
const fs = require("fs");
const url = require("url");

const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
  const pathName = url.parse(req.url, true).pathname;
  const id = url.parse(req.url, true).query.id;

  //Product overview Page

  if (pathName === "/product" || pathName === "/") {
    res.writeHead(200, { "Content-type": "text/html" });

    fs.readFile(
      `${__dirname}/template/template-overview.html`,
      "utf-8",
      (err, data) => {
        let overviewOutput = data;
        fs.readFile(
          `${__dirname}/template/template-card.html`,
          "utf-8",
          (err, data) => {
            const outputCard = laptopData
              .map(el => replacePlaceHolder(data, el))
              .join("");
            overviewOutput = overviewOutput.replace("{%CARDS%}", outputCard);
            res.end(overviewOutput);
          }
        );
      }
    );
  }
  // Laptop Store Page
  else if (pathName === "/laptop" || id < laptopData.length) {
    res.writeHead(200, { "Content-type": "text/html" });

    fs.readFile(
      `${__dirname}/template/template-laptop.html`,
      "utf-8",
      (err, data) => {
        const laptop = laptopData[id];
        const originalHTML = replacePlaceHolder(data, laptop);
        res.end(originalHTML);
      }
    );
  }

  //Image
  else if (/\.(jpg|jpeg|png|gif)$/i.test(pathName)) {
    res.writeHead(200, { "Content-type": "image/jpg" });
    fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
      res.end(data);
    });
  } else {
    console.log(pathName);
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("URL not found");
  }
});

server.listen("1337", "127.0.0.1", () => {
  console.log(`Listening Request`);
});

replacePlaceHolder = (originalHTML, laptop) => {
  overviewOutput = originalHTML.replace(/{%PRODUCTNAME%}/g, laptop.productName);

  overviewOutput = overviewOutput.replace(/{%PRICE%}/g, laptop.price);
  overviewOutput = overviewOutput.replace(/{%IMAGE%}/g, laptop.image);
  overviewOutput = overviewOutput.replace(/{%CPU%}/g, laptop.cpu);
  overviewOutput = overviewOutput.replace(/{%RAM%}/g, laptop.ram);
  overviewOutput = overviewOutput.replace(/{%STORAGE%}/g, laptop.storage);
  overviewOutput = overviewOutput.replace(
    /{%DESCRIPTION%}/g,
    laptop.description
  );
  overviewOutput = overviewOutput.replace(/{%SCREEN%}/g, laptop.screen);
  overviewOutput = overviewOutput.replace(/{%ID%}/g, laptop.id);

  return overviewOutput;
};
