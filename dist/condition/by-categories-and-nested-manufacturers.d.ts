import { BaseSearchCondition } from "./abstract";
export declare class ByCategoriesAndNestedManufacturersSearchCondition extends BaseSearchCondition {
    constructor(query: string, categories?: string[], manufacturers?: string[]);
}
