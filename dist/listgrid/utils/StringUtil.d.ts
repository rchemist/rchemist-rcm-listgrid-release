export declare function isBlank(data: unknown): boolean;
export declare function appendString(str: string | null | undefined, added: string[] | string | null | undefined, splitter?: string): string;
export declare function subStringBeforeLast(value: string, splitCode: string): string;
export declare function subStringBefore(value: string, splitCode: string): string;
export declare function subStringAfterLast(value: string, splitCode: string): string;
export declare function subStringAfter(value: string, splitCode: string): string;
export declare function subStringBetween(value: string, startCode: string, endCode: string): string;
export declare function subStringBetweenLast(value: string, startCode: string, endCode: string): string;
export declare function defaultString(value: unknown, defaultValue?: string): string;
export declare function appendPrefix(str: string, prefix: string, split?: string): string;
export declare function appendSuffix(str: string, suffix: string, split?: string): string;
export declare function removePrefix(str: string, prefix: string, split?: string): string;
export declare function removeSuffix(str: string, suffix: string, split?: string): string;
export declare function appendPrefixSuffix(str: string, prefix: string, suffix: string, split?: string): string;
export declare function getHashCode(data: unknown): number;
export declare function removeTrailingSeparator(input: string, separator: string): string;
export declare function startsWith(value: string, prefix: string, ignoreCase?: boolean): boolean;
export declare function endsWith(value?: string, postFix?: string, ignoreCase?: boolean): boolean;
export declare function convertToCamelCase(input?: string): string;
export declare function equalsIgnoreCase(value: string, other: string, trim?: boolean): boolean;
export type WordPostfixType = '1' | '2';
/**
 * 단어 뒤에 '은', '는', '이', '가'를 선택적으로 붙여 준다.
 * 한글에 대해서 유효하며, 한글이 아닌 단어는 제대로 되지 않지만 유사하게 처리된다.
 * @param type
 * @param word
 */
export declare function addKoreanWordPostfix(type: WordPostfixType, word?: string): string;
export declare function generateSlug(input?: string): string;
export declare function camelCaseToSnakeCase(camel: string, upperCase: boolean): string;
export declare function splitWithSplitCode(value: string, split: string): string[];
export declare function equalsIgnoreBlank(value: string | null | undefined, other: string | null | undefined): boolean;
//# sourceMappingURL=StringUtil.d.ts.map