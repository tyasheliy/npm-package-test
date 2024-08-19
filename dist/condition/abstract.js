export class BaseSearchCondition {
    constructor(query, aggregations, filter) {
        this.query = query;
        this.aggregations = aggregations;
        this.filter = filter;
    }
    buildRequest() {
        return {
            query: this.query,
            aggregations: this.aggregations,
            filter: this.filter
        };
    }
}
