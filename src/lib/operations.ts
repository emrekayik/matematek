import metadelta from '@metadelta/core';

// metadelta modülünün tiplerini tanımlayalım
interface MetadeltaCore {
    simplify: (expression: string) => string;
    factor: (expression: string) => string;
    zeroes: (expression: string) => string[];
    integrate: (expression: string) => string;
    derive: (expression: string) => string;
    cos: (expression: string) => string;
    sin: (expression: string) => string;
    tan: (expression: string) => string;
    arccos: (expression: string) => string;
    arcsin: (expression: string) => string;
    arctan: (expression: string) => string;
    abs: (expression: string) => string;
    log: (base: string, arg: string) => string;
    tangent: (f: string, at: number) => string;
    areaUnder: (f: string, options: { start: string | number; finish: string | number }) => number;
}

// metadelta'yı MetadeltaCore tipine cast edelim
const typedMetadelta = metadelta as unknown as MetadeltaCore;

const operations = {
    simplify: typedMetadelta.simplify,
    factor: typedMetadelta.factor,
    zeroes: typedMetadelta.zeroes,
    integrate: typedMetadelta.integrate,
    derive: typedMetadelta.derive,
    cos: typedMetadelta.cos,
    sin: typedMetadelta.sin,
    tan: typedMetadelta.tan,
    arccos: typedMetadelta.arccos,
    arcsin: typedMetadelta.arcsin,
    arctan: typedMetadelta.arcsin,
    abs: typedMetadelta.abs,
    log: (expression: string): string => {
        const [base, arg] = expression.split('|');
        return typedMetadelta.log(base, arg);
    },
    tangent: (expression: string): string => {
        const [at, f] = expression.split('|');
        return typedMetadelta.tangent(f, parseInt(at));
    },
    area: (expression: string): string => {
        const [range, f] = expression.split('|');
        const [from, to] = range.split(':');
        return '' + typedMetadelta.areaUnder(f, { start: from, finish: to });
    }
};

export type OperationType = keyof typeof operations;

export default operations;