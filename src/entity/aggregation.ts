export type Aggregation = {
    kind: string;
    name: string;
    data: {[key: string]: any};
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

export const createTypeAggregation = (name: string, queryType: string, field: string, children?: Aggregation[]): Aggregation => {
    return {
        kind: "type",
        name: name,
        data: {
            "type": queryType,
            "field": field
        },
        children: children
    };
};

// Удалить когда будут нормальные фильтры.
export const getFilterAggregationTermQueryBody = (field: string, value: string): string => {
    return `{ "query": { "term": { "${field}": ${value} } } }`;
};

export const createFilterAggregation = (name: string, queryBody: string, children?: Aggregation[]): Aggregation => {
    return {
        kind: "filter",
        name: name,
        data: {
            "query_body": queryBody
        },
        children: children
    };
};