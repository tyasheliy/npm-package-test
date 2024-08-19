export class LocalStorageSearchHistory {
    validateKey() {
        if (localStorage.getItem(this.key) === null) {
            localStorage.setItem(this.key, "");
        }
    }
    constructor(config) {
        this.key = config.key;
        this.maxQueries = config.maxQueries;
        this.validateKey();
    }
    getQueries() {
        this.validateKey();
        const queries = localStorage.getItem(this.key);
        return queries.split(",")[0] === "" ? [] : queries.split(",");
    }
    addQuery(query) {
        const queries = this.getQueries();
        const existing = queries.find((val) => val === query);
        if (existing !== undefined) {
            queries.splice(queries.indexOf(existing), 1);
        }
        if (queries.length >= this.maxQueries) {
            queries.pop();
        }
        queries.unshift(query);
        localStorage.setItem(this.key, queries.join(","));
    }
}
