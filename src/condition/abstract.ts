import {SearchRequest} from "../client/search-service";
import {Aggregation} from "../entity/aggregation";

export interface SearchCondition {
    buildRequest(): SearchRequest;
}

export class BaseSearchCondition implements SearchCondition {
    private query: string;
    private aggregations?: Aggregation[];
    private filter?: {[key: string]: string[]}

    public constructor(
        query: string,
        aggregations?: Aggregation[],
        filter?: {[key: string]: string[]}
    ) {
        this.query = query;
        this.aggregations = aggregations;
        this.filter = filter;
    }

    public buildRequest(): SearchRequest {
        return {
            query: this.query,
            aggregations: this.aggregations,
            filter: this.filter
        };
    }
}