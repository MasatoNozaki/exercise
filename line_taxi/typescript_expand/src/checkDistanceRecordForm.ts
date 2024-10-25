const SPLIT = '\n';
export function checkFirstDistance(record: string): boolean {
    const distances = record.split(SPLIT);
    if (distances[0] === '0.0') {
        return true;
    }
    else {
        return false;
    }
}

export function checkExistance_First_and_LastRecord(record: string): boolean {
    const distances = record.split(SPLIT);
    if (distances.length >= 2) {
        return true;
    }
    else {
        return false;
    }
}

export function checkEndLine(record: string): boolean {
    const distances = record.split(SPLIT);
    if (distances[distances.length - 1] === "") {
        return true;
    }
    else {
        return false;
    }
}