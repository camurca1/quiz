export function shuffle(elements: any[]): any[] {
    return elements
            .map(value => ({ value, randomNumber: Math.random() }))
            .sort((objA, objB) => objA.randomNumber - objB.randomNumber)
            .map(obj => obj.value);
}