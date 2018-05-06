import * as mongodb from 'mongodb';
let dbConn: mongodb.MongoClient;
let db: mongodb.Db;

export async function getDb() {
  let connectStr: string = 'mongodb://118.31.11.181:27017/craw';
  dbConn = dbConn || (await mongodb.MongoClient.connect(connectStr));
  db = db || dbConn.db('craw');
  return db;

}

export async function closeDb(){
  if(dbConn){
    await dbConn.close();
  }
}