/**
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { ListableFormField } from '../../fields/abstract';
export interface MappedByFieldFilterOptions {
    mappedBy: string;
    includePatterns?: string[];
    excludePatterns?: string[];
}
/**
 * Filters out mappedBy related fields from a field array.
 *
 * For example, if mappedBy is "studentId":
 * - "studentId" is filtered out
 * - "student" is filtered out (base field without Id suffix)
 * - "student.name", "student.id" etc. are filtered out (nested patterns)
 *
 * Unless they are explicitly included in includePatterns.
 *
 * @param fields The list of fields to filter
 * @param options Filter options including mappedBy and optional include/exclude patterns
 * @returns Filtered field array
 */
export declare function filterMappedByFields(fields: ListableFormField<any>[], options: MappedByFieldFilterOptions): ListableFormField<any>[];
//# sourceMappingURL=mappedByFieldFilter.d.ts.map