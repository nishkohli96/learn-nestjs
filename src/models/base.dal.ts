import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import {
    UpdateQuery,
    FilterQuery,
    PopulateOptions,
    DocumentDefinition,
} from 'mongoose';

export type WhereFilter<T> = FilterQuery<DocumentType<T>>;
export type MongoSelectionSet = Record<string, boolean>;
export type Any = Record<string, unknown>;

export interface DALOptions {
    select?: string | MongoSelectionSet;
    sort?: Any;
    upsert?: boolean;
    arrayFilters?: Array<Any>;
    limit?: number;
    skip?: number;
    populate?: string | PopulateOptions;
}

const opt: DALOptions = {
    select: '-__v',
    sort: undefined,
    upsert: false,
    skip: 0,
    limit: 0,
    arrayFilters: [],
    populate: undefined,
};

export abstract class BaseDAL<SchemaType> {
    constructor(protected readonly Model: ModelType<SchemaType>) {}

    async create(
        data: DocumentDefinition<Omit<SchemaType, '_id'>>,
    ): Promise<SchemaType> {
        const doc = await this.Model.create(data);

        Reflect.deleteProperty(doc, '__v');

        return doc;
    }

    findOne(
        where: WhereFilter<SchemaType>,
        options: DALOptions = {},
    ): Promise<SchemaType> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { select, populate } = {
            ...opt,
            ...options,
        };

        return this.Model.findOne(where)
            .select(select)
            .populate(populate)
            .lean()
            .exec() as Promise<SchemaType>;
    }

    findAll(
        where: WhereFilter<SchemaType>,
        options: DALOptions = {},
    ): Promise<SchemaType[]> {
        const { select, sort, limit, skip } = {
            ...opt,
            ...options,
        };

        return this.Model.find(where)
            .select(select)
            .sort(sort)
            .skip(Number(skip))
            .limit(Number(limit))
            .lean()
            .exec() as unknown as Promise<SchemaType[]>;
    }

    updateOne(
        where: WhereFilter<SchemaType>,
        data: UpdateQuery<DocumentType<SchemaType>>,
        options: DALOptions = {},
    ): Promise<SchemaType> {
        const { select, upsert, arrayFilters } = {
            ...opt,
            ...options,
        };

        return this.Model.findOneAndUpdate(where, data, {
            new: true,
            upsert,
            arrayFilters,
        })
            .select(select)
            .lean()
            .exec() as Promise<SchemaType>;
    }

    deleteOne(
        where: WhereFilter<SchemaType>,
        options: DALOptions = {},
    ): Promise<SchemaType> {
        const { select } = {
            ...opt,
            ...options,
        };

        return this.Model.findOneAndDelete(where)
            .select(select)
            .lean()
            .exec() as Promise<SchemaType>;
    }

    count(criteria: WhereFilter<SchemaType>): Promise<number> {
        return this.Model.countDocuments(criteria).exec();
    }

    totalCount(): Promise<number> {
        return this.Model.estimatedDocumentCount().exec();
    }
}
