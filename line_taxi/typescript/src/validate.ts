declare const lineNominality: unique symbol;
type recordLine = string & { [lineNominality]: never; };

export const validate = (input: string): boolean => {
    const lines = input.split('\n');
    // 初乗レコードが存在しない
    // 初乗レコードと降車時の2行以上が存在しない
    // 初乗から降車までの距離は0.1以上である
    for (const line of lines) {
        if (isLine(line)) {
            // 時間軸に沿っていない
            // レコードの間隔が45秒未満でない
        }
        else {
            throw new RecordFormError(line);
        }
    }
    return true;
};

const isLine = (line: string): line is recordLine => {
    return /^[0-9][0-9]:[0-9][0-9]:[0-9][0-9]\.[0-9][0-9][0-9] (0|[1-9][0-9]?)\.[0-9]$/.test(line);
};

export class RecordFormError extends Error {
    public constructor(line: string) {
        super(`Record form is invalid. Form is 'HH:mm:ss.fff dd.d'. Given form is ${line}`);
    }
}