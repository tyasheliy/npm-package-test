export type SearchHistoryConfig = {
    key: string;
    maxQueries: number;
};
export interface SearchHistory {
    getQueries(): string[];
    addQuery(query: string): void;
}
export declare class LocalStorageSearchHistory implements SearchHistory {
    private key;
    private maxQueries;
    private validateKey;
    constructor(config: SearchHistoryConfig);
    getQueries(): string[];
    addQuery(query: string): void;
}
