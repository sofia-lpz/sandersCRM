const path = require('path'); //for local debugging
const fs = require('fs').promises;
const handlebars = require('handlebars');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
require('dotenv').config();
const { engine } = require('express-handlebars');
const sequelize = require('./config/database.js');
const s3 = require('./config/aws.js');
const Request = require('./models/pdf-generation-request.js');
const { DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

const headerTemplate = `
  <div style="width: 100%; text-align: center; font-size: 10px; padding-top: 10px;">
      <span class="date"></span>
      <span class="title" style="margin: 0 10px;"></span>
      <span class="pageNumber"></span> / <span class="totalPages"></span>
    </div>
`;

const footerTemplate = `
    <div style="width: 100%; text-align: center; font-size: 10px; padding-top: 10px;">
      <span class="date"></span>
      <span class="title" style="margin: 0 10px;"></span>
      <span class="pageNumber"></span> / <span class="totalPages"></span>
    </div>
  `;

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Allow only the frontend to make requests
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Handlebars Setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Handlebars Helpers
handlebars.registerHelper('chartData', function(data) {
  return JSON.stringify(data);
});

handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

handlebars.registerHelper('calculateTotal', function(items, key) {
  return items.reduce((sum, item) => sum + parseFloat(item[key] || 0), 0).toFixed(4);
});

// Cache for compiled templates
const templateCache = {};

//reuse puppeteer browser instance
let browser = null;
(async () => {
  try {
    browser = await puppeteer.launch();
  } catch (error) {
    console.error('Failed to launch Puppeteer:', error);
    process.exit(1); // Exit the process if the browser fails to launch
  }
})();

// Routes

app.get('/', (req, res) => {
  res.status(200).json({ status: "Ok" });
});

app.post('/generate-pdf', async (req, res) => {
  const { template_name, data } = req.body;

  if (!template_name || !data) {
    return res.status(400).json({ error: 'Template name and data are required' });
  }

  try {
    // Create a new PDF generation request
    const request = { template_name, status: 'processing',  id: data.id};
    //const request = await Request.create({ template_name, status: 'processing' });

    //Check if template is cached, if not, compile and cache it
    let template;
    if (templateCache[template_name]) {
      console.log('Using cached template');
      template = templateCache[template_name];
    }
    else {
      console.log('Compiling new template');
      const templatePath = path.join(__dirname, 'templates', `${template_name}.hbs`);
      const cssPath = path.join(__dirname, 'templates', `${template_name}.css`);
      const templateHtml = await fs.readFile(templatePath, 'utf8');
      const templateCss = await fs.readFile(cssPath, 'utf8');

      const templateWithCss = `
        <style>
          ${templateCss}
        </style>
        ${templateHtml}
      `;

      template = handlebars.compile(templateWithCss);
      templateCache[template_name] = template;
    }
    
    const compiledHtml = template(data);

    if (!browser) {
      browser = await puppeteer.launch();
    }

    // Generate PDF
    const page = await browser.newPage();
    await page.setContent(compiledHtml);

    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '20mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
      printBackground: true,
      scale: 1,
      displayHeaderFooter: true,
      headerTemplate: headerTemplate,
      footerTemplate: footerTemplate
    });

    // Upload PDF to S3
    const s3Key = `pdfs/${request.id}.pdf`;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: s3Key,
      Body: pdfBuffer,
      ContentType: 'application/pdf',
    };

    await s3.upload(params).promise();

    // Save PDF to local filesystem for debugging
    //const pdfPath = path.join(__dirname, 'pdfs', `${template_name}___${request.id}.pdf`);
    //await fs.writeFile(pdfPath, pdfBuffer);

    // Update request status and S3 key in the database
    request.status = 'complete';
    request.s3_key = s3Key;
    //await request.save();

    // Generate presigned url
    const pdfUrl = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: s3Key,
      Expires: 60, // URL expires in 60 seconds
    };
    const url = s3.getSignedUrl('getObject', pdfUrl);

    res.status(200).json({ id: request.id, status: request.status, s3_key: request.s3_key, url });
  } catch (error) {
    res.status(500).json({ error: `Failed to generate PDF: ${error.message}` });
  }
});

/*
app.get('/pdf/:id/url', async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.findByPk(id);
    if (!request || request.status !== 'complete') {
      return res.status(404).json({ error: 'PDF not found or not ready yet' });
    }


    // Generate presigned url
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `pdfs/${id}.pdf`,
      Expires: 60, // URL expires in 60 seconds
    };
    const url = s3.getSignedUrl('getObject', params);

    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error: `Failed to retrieve PDF URL: ${error.message}` });
  }
});


*/

app.listen(PORT, () => {
  console.log("Sunucu okd")
})


/**
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

 */