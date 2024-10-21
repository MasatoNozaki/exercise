declare const lineNominality: unique symbol;
type recordLine = string & { [lineNominality]: never; };

export const validate = (input: string): boolean => {
    const lines = input.split('\n');
    for (const line of lines) {
        if (isLine(line)) {
            return true;
        }
        else {
            throw new RecordFormError(line);
        }
    }
    return false;
};

const isLine = (line: string): line is recordLine => {
    return /^[0-9][0-9]:[0-9][0-9]:[0-9][0-9]\.[0-9][0-9][0-9] [0-9]*[0-9]\.[0-9]$/.test(line);
};

export class RecordFormError extends Error {
    public constructor(line: string) {
        super(`Record form is invalid. Form is 'HH:mm:ss.fff dd.d'. Given form is ${line}`);
    }
}