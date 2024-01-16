import { MongoClient } from 'mongodb';

const Name = process.env.DB_NAME || '';

export class controller {
  private url: string;
  private DB: any;
  private DbName: string;

  constructor(url: string) {
    this.url = url;
    this.DbName = Name;
  }
  async Connect() {
    this.DB = new MongoClient(this.url);
    await this.DB.connect();
    console.log('Connected to database');
  }
  async Aggregate(collection: string, pipeline: any[]) {
    return await this.DB.db(this.DbName).collection(collection).aggregate(pipeline).toArray();
  }

  async Get(collection: string, object: object, projection?: object, sort?: object, limit?: number) {
    return (
      (await this.DB.db(this.DbName)
        .collection(collection)
        .find(object)
        .project(projection || {})
        //@ts-ignore
        .sort(sort || {})
        .limit(limit || 999999)
        .toArray()) as any[]
    );
  }
  async Add(collection: string, object: object) {
    return await this.DB.db(this.DbName).collection(collection).insertOne(object);
  }
  async Update(collection: string, object: object, update: any) {
    update._id && delete update['_id'];
    return await this.DB.db(this.DbName).collection(collection).updateMany(object, { $set: update });
  }
  async Delete(collection: string, object: object) {
    return await this.DB.db(this.DbName).collection(collection).deleteOne(object);
  }

  async FindAndUpdate(collection: string, object: object, update: any) {
    update._id && delete update['_id'];
    return await this.DB.db(this.DbName).collection(collection).findOneAndUpdate(object, update);
  }
}

export const database = new controller(process.env.DB_URI || '');
