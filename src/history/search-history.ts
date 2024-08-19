export type SearchHistoryConfig = {
    key: string;
    maxQueries: number;
}

export interface SearchHistory {
    getQueries(): string[];
    addQuery(query: string): void;
}

export class LocalStorageSearchHistory implements SearchHistory {
    private key: string;
    private maxQueries: number;

    private validateKey(): void {
        if (localStorage.getItem(this.key) === null) {
            localStorage.setItem(this.key, "");
        }
    }

    public constructor(
        config: SearchHistoryConfig
    ) {
        this.key = config.key;
        this.maxQueries = config.maxQueries;

        this.validateKey();
    }


    public getQueries(): string[] {
        this.validateKey();

        const queries = localStorage.getItem(this.key) as string;

        return queries.split(",")[0] === "" ? [] : queries.split(",");
    }

    public addQuery(query: string): void {
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