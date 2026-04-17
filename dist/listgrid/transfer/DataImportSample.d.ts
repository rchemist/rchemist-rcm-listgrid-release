import { FC } from 'react';
import { DataField, SampleDataItem } from '../transfer/Type';
export interface DataImportSampleProps {
    sampleFileName?: string;
    fields: DataField[];
    sampleData?: SampleDataItem[][];
    allowUpdate?: boolean;
}
export declare const DataImportSample: FC<DataImportSampleProps>;
export default DataImportSample;
//# sourceMappingURL=DataImportSample.d.ts.map