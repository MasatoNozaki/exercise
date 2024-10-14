export class DistanceMeter {
    distance: number = 0;
    update = (newDistance: number) => {
        this.distance += newDistance;
    };
};