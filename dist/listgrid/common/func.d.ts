import { AdditionalColorType, ColorType, GutterType, ResponsiveValue, ShapeType, SizeType, VariantType, WindowPositionType } from "./type";
export declare function getWindowPositionClassName(position: WindowPositionType): string;
export declare function isAdditionalColorType(color: string): color is AdditionalColorType | ColorType;
export declare function getAdditionalColorClass(color: string): "bg-dark" | "bg-gray" | "bg-red" | "bg-pink" | "bg-grape" | "bg-violet" | "bg-indigo" | "bg-blue" | "bg-cyan" | "bg-green" | "bg-lime" | "bg-yellow" | "bg-orange" | "bg-teal" | "bg-black" | "bg-white border" | "bg-primary" | "bg-info" | "bg-success" | "bg-warning" | "bg-danger" | "bg-secondary";
export declare function getTextColorClass(color: string): "text-dark" | "text-gray" | "text-red" | "text-pink" | "text-grape" | "text-violet" | "text-indigo" | "text-blue" | "text-cyan" | "text-green" | "text-lime" | "text-yellow" | "text-orange" | "text-teal" | "text-black" | "text-white" | "text-primary" | "text-info" | "text-success" | "text-warning" | "text-danger" | "text-secondary";
export declare function getOppositeTextColorClass(color: string): "text-dark" | "text-white";
export declare function getOrderedColorType(num: number): ColorType;
export declare function getBgColor(color: ColorType | AdditionalColorType | string): string;
export declare function getColorSuffix(color: ColorType | string): string;
export declare function getMaxWidthClassName(size: SizeType | undefined): string;
export declare function getAlignClassName(alignType: "left" | "center" | "right", flex?: boolean): "justify-start" | "justify-center" | "justify-end" | "text-left" | "text-center" | "text-right";
export declare function getGutterValue(gutter: GutterType): string;
export declare function getResponsiveClasses(value: ResponsiveValue<any>, prefix: string, valueMap?: Record<string, string> | ((val: any) => string)): string;
export declare function getShapeClassName(shape: ShapeType): string;
export declare function getSizeClassName(size: SizeType): string;
export declare function getColorClass(color: ColorType | string, variant: VariantType): string;
//# sourceMappingURL=func.d.ts.map