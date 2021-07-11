const express = require('express');
const server = express();
const puppeteer = require('puppeteer');
function rendimentoMesChia(string){
  let valor = string.split(" ")[0];
  valor = valor.replace(".",",");
  valor = valor.replace("$","");
  return valor
}
server.get('/', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.google.com/search?q=cotacao+dolar", {
    waitUntil: 'networkidle2',
  });
  
 const pageGoogle = await page.evaluate(() => {
    return {
      dolar: document.querySelector('#knowledge-currency__updatable-data-column > div.b1hJbf > div.dDoNo.ikb4Bb.gsrt.gzfeS > span.DFlfde.SwHCTb').innerText,
    };
  });
  page.waitForSelector("#tabs-16--tabpanel-0 > div > section.css-11peh17 > div.css-fx812f > div:nth-child(6) > dl > dd");
  await page.goto("https://chiacalculator.com/", {
    waitUntil: 'networkidle2',
  });

  var chia = await page.evaluate(() =>{
    return{
      rendimentoMes:document.querySelector("#tabs-16--tabpanel-0 > div > section.css-11peh17 > div.css-fx812f > div:nth-child(6) > dl > dd").innerText,
      valorChia:document.querySelector("#__next > div > div.chakra-container.css-1y92oj3 > div.css-1jnhzvh > div > section.css-1aj06f4 > div > div > input").value,
    }
    
  });

  await browser.close();
//tentando commitar
  res.send({
    "dolar":pageGoogle.dolar,
    "valorChia":chia.valorChia,
    "rendimentoMes":rendimentoMesChia(chia.rendimentoMes)
  })
});

const port = 3000;
server.listen(port, () => {
    console.log(`
    Servidor subiu com sucesso! 
    acesse em http://localhost:${port}`);
});