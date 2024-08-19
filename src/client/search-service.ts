import {AxiosInstance} from "axios";
import axios from "axios";
import {Aggregation, Result} from "../entity/aggregation";
import {Product} from "../entity/product";
import camelcaseKeys from "camelcase-keys";

export type SearchServiceClientConfig = {
    host: string;
    index: string;
}

const search_endpoint = "/search";
const aggregate_endpoint = "/aggregate";

export interface SearchServiceClient {
    search(request: SearchRequest): Promise<SearchResponse>;
    aggregate(request: AggregateRequest): Promise<AggregateResponse>;
};

export type SearchRequest = {
    query: string;
    aggregations?: Aggregation[];
    filter?: {[key: string]: string[]}
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

export class AxiosSearchServiceClient implements SearchServiceClient{
    private client: AxiosInstance;
    //private abortController: AbortController;

    public constructor(
        config: SearchServiceClientConfig
    ) {
        //this.abortController = new AbortController();

        this.client = axios.create({
            baseURL: `${config.host}/api/v1/${config.index}`
        });
    }

    private async makeRequest(method: string, endpoint: string, data: object): Promise<any> {
        const resp = await this.client.request({
            method: method,
            url: endpoint,
            data: data
            //signal: this.abortController.signal
        });

        if (resp.status >= 300) {
            throw new Error(resp.data.toString());
        }

        if (!resp.data) {
            throw new Error("unknown error, empty response body");
        }

        return camelcaseKeys(resp.data);
    }

    public search(request: SearchRequest): Promise<SearchResponse> {
        return this.makeRequest("POST", search_endpoint, request);
    }

    public aggregate(request: AggregateRequest): Promise<AggregateResponse> {
        return this.makeRequest("POST", aggregate_endpoint, request);
    }
}