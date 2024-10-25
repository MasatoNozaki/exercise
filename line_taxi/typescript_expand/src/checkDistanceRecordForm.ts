const SPLIT = '\n';

export function checkDistanceRecordForm(record: string): boolean {
    const distances = record.split(SPLIT);

    return checkFirstDistance(distances) && checkExistance_First_and_LastRecord(distances) && checkEndLine(distances);
}

function checkFirstDistance(distances: string[]): boolean {
    if (distances[0] === '0.0') {
        return true;
    }
    else {
        return false;
    }
}

function checkExistance_First_and_LastRecord(distances: string[]): boolean {
    if (distances.length >= 2) {
        return true;
    }
    else {
        return false;
    }
}

function checkEndLine(distances: string[]): boolean {
    if (distances[distances.length - 1] === "") {
        return true;
    }
    else {
        return false;
    }
}