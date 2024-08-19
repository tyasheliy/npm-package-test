export type Aggregation = {
    kind: string;
    name: string;
    data: {
        [key: string]: any;
    };
    children?: Aggregation[];
};
export type Result = {
    name: string;
    buckets: Bucket[];
};
export type Bucket = {
    key: string;
    count: number;
    results: Result[];
};
export declare const createTypeAggregation: (name: string, queryType: string, field: string, children?: Aggregation[]) => Aggregation;
export declare const getFilterAggregationTermQueryBody: (field: string, value: string) => string;
export declare const createFilterAggregation: (name: string, queryBody: string, children?: Aggregation[]) => Aggregation;
