export const createTypeAggregation = (name, queryType, field, children) => {
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
export const getFilterAggregationTermQueryBody = (field, value) => {
    return `{ "query": { "term": { "${field}": ${value} } } }`;
};
export const createFilterAggregation = (name, queryBody, children) => {
    return {
        kind: "filter",
        name: name,
        data: {
            "query_body": queryBody
        },
        children: children
    };
};
