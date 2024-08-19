import { Aggregation, Result } from "../entity";
import { Product } from "../entity";
export type SearchServiceClientConfig = {
    host: string;
    index: string;
};
export interface SearchServiceClient {
    search(request: SearchRequest): Promise<SearchResponse>;
    aggregate(request: AggregateRequest): Promise<AggregateResponse>;
}
export type SearchRequest = {
    query: string;
    aggregations?: Aggregation[];
    filter?: {
        [key: string]: string[];
    };
};
export type SearchResponse = {
    products: Product[];
    totalHits: number;
    aggregations?: Result[];
};
export type AggregateRequest = {
    aggregations: Aggregation[];
};
export type AggregateResponse = {
    aggregations: Result[];
};
export declare class AxiosSearchServiceClient implements SearchServiceClient {
    private client;
    constructor(config: SearchServiceClientConfig);
    private makeRequest;
    search(request: SearchRequest): Promise<SearchResponse>;
    aggregate(request: AggregateRequest): Promise<AggregateResponse>;
}
