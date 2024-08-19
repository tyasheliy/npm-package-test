import { BaseSearchCondition } from "./abstract";
import { createTypeAggregation } from "../entity";
export class ByCategoriesAndNestedManufacturersSearchCondition extends BaseSearchCondition {
    constructor(query, categories, manufacturers) {
        let filter = undefined;
        if (categories !== undefined || manufacturers !== undefined) {
            filter = {};
            if (categories !== undefined) {
                filter["category.name.keyword"] = categories;
            }
            if (manufacturers !== undefined) {
                filter["manufacturer.keyword"] = manufacturers;
            }
        }
        const manufacturersAgg = createTypeAggregation("manufacturers", "terms", "manufacturer.keyword");
        const categoriesAgg = createTypeAggregation("categories", "terms", "category.name.keyword", [manufacturersAgg]);
        super(query, [categoriesAgg], filter);
    }
}
