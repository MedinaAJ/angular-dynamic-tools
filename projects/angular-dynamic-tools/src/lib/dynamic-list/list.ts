import { DynamicListConfig, DynamicListEvent } from "./dynamic-list.types";

export interface List {
    listConfig: DynamicListConfig;
    listEvent(event: DynamicListEvent): void;
}