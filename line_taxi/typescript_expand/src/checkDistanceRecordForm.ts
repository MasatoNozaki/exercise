const SPLIT = '\n';

declare const distanceNominality: unique symbol;
type distanceRecord = string & { [distanceNominality]: never; };

const isDistanceRecord = (line: string): line is distanceRecord => {
    return /^(0|[1-9][0-9]?)\.[0-9]$/.test(line);
};

export function checkDistanceRecordForm(record: string): boolean {
    if (!checkEndLine(record)) {
        return false;
    }

    // 末尾の改行記号がdistanceRecord Typeに違反するためここで削除する
    const recordTrimLastLF = record.trimEnd();

    try {
        const distances = checkDistanceRecordStyle(recordTrimLastLF);
        return checkFirstDistance(distances) && checkExistance_First_and_LastRecord(distances) && checkTotalDistance(distances);
    } catch (e) {
        if (e instanceof DistanceStyleError) {
            return false;
        } else {
            throw new Error('unknown error!');
        }
    }
}

function checkDistanceRecordStyle(record: string): distanceRecord[] {
    const lines = record.split(SPLIT);
    for (const line of lines) {
        if (!isDistanceRecord(line)) {
            throw new DistanceStyleError(line);
        }
    }

    // distanceRecordであることがすでに確かめられているのでasが許される
    return lines as distanceRecord[];
}

function checkFirstDistance(distances: distanceRecord[]): boolean {
    if (distances[0] === '0.0') {
        return true;
    } else {
        return false;
    }
}

function checkExistance_First_and_LastRecord(distances: distanceRecord[]): boolean {
    if (distances.length >= 2) {
        return true;
    } else {
        return false;
    }
}

function checkEndLine(record: string): boolean {
    const lines = record.split(SPLIT);
    if (lines[lines.length - 1] === "") {
        return true;
    } else {
        return false;
    }
}

function checkTotalDistance(distances: distanceRecord[]): boolean {
    let sum = 0;
    for (const distance of distances) {
        sum += Number(distance);
    }

    if (sum >= 0.1) {
        return true;
    } else {
        return false;
    }
}

class DistanceStyleError extends Error {
    constructor(errorStyle: string) {
        super(`Distance style error! min: 0.0, max: 99.9\nError style is ${errorStyle}`);
    }
}