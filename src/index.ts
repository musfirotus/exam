require('dotenv').config();
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from 'express';
import * as morgan from 'morgan';
import { MongoConfig } from './config/mongo.config';
import { returnsErrorMessage, writeErrorLogToFile } from "./utils/error-log.helper";
import { ValidateError } from 'tsoa';
import * as SwaggerUI from 'swagger-ui-express';
import * as methodOverride from 'method-override';
import { uploadPedomanRoute } from "./routes/v1/upload-pedoman.route";
import { RegisterRoutes } from "./application/controllers/routes";

const app: express.Application = express();

app.use(morgan('common'));
app.use(
  express.json({
    limit: '50mb'
  })
);
app.use(
  express.urlencoded({ 
    extended: true 
  })
);
app.use(methodOverride());
app.use(express.static('public'));

// tambahin manual route yang dibuat di atas regtister route tsoa
app.use('/api', uploadPedomanRoute);
// tambahin register routes tsoa disini
RegisterRoutes(app);

app.use(function errorHandler(
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    writeErrorLogToFile(String(err.fields));
    return res.status(422).json({
      message: "Validation Failed",
      details: err.fields,
    });
  }
  if (err instanceof Error) {
    writeErrorLogToFile(String(err.message));
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

try {
  const swaggerDocument = require('../swagger.json');
  app.use('/api-docs', SwaggerUI.serve);
  app.get('/api-docs', SwaggerUI.setup(swaggerDocument));
  } catch (error) {
    console.log('unable to read swagger json');
  throw error;
}

app.use('*', (req: express.Request, res: express.Response) => {
  returnsErrorMessage(res, 'not found', 404);
})

app.listen(process.env.PORT || 3000, async () => {
  try {
    await createConnection('praktikum');
    console.info('connected to praktikum');
    // await createConnection('srs');
    // console.info('connected to srs');
    await MongoConfig.connect();
    console.info('connected to mongo');
    console.log('service running on port: ' + process.env.PORT);
  } catch (error) {
    console.error(error);
  }
});
