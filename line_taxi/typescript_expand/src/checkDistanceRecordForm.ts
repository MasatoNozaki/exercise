export function checkFirstDistance(record: string): boolean {
    const distances = record.split('\n');
    if (distances[0] === '0.0') {
        return true;
    }
    else {
        return false;
    }
}