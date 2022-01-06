require('dotenv').config();
import * as mongoose from 'mongoose';

export class MongoConfig {

  public static connect() {
    return mongoose.connect((process.env['MONGODB_URI'] as string), {
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

}
