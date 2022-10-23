import { InferSchemaType, Types } from 'mongoose';

export type SchemaType<T> = { _id: Types.ObjectId } & InferSchemaType<T>;
