import PDFDocument from 'pdfkit'

const pdfkit = require('pdfkit')
const fs = require("fs")


const doc = new PDFDocument();

doc.pipe(fs.createWriteStream('output.pdf'));

doc.font('fonts /PalatinoBold.ttf').fontSize(25).text( ' Текст со встроенным шрифтом!' , 100 , 100 ) ;

doc.image('path/to/image.png', {fit: [250, 300], align: 'center', valign: 'center'});

doc.addPage().fontSize(25).text( ' Здесь представлена ​​векторная графика...', 100 , 100 ) ;
  
