import { SearchRequest } from "../client/search-service";
import { Aggregation } from "../entity/aggregation";
export interface SearchCondition {
    buildRequest(): SearchRequest;
}
export declare class BaseSearchCondition implements SearchCondition {
    private query;
    private aggregations?;
    private filter?;
    constructor(query: string, aggregations?: Aggregation[], filter?: {
        [key: string]: string[];
    });
    buildRequest(): SearchRequest;
}
