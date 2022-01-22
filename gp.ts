export interface Model<T> {
    // generate a random individual
    generate: () => T;

    // scores an individual
    score: (t: T) => number;

    // combines two parents to produce one or more children
    breed: (a: T, b: T) => T[];

    // randomly mutates an individual
    mutate: (t: T) => T;
};

interface Scored<T> {
    value: T;
    score: number;
}

type Population<T> = Scored<T>[];

function tournament<T>(population: Population<T>): T {
    const n = Math.ceil(Math.sqrt(population.length));
    const participants = [];
    let totalScore = 0;
    for (let i = 0; i < n; i++) {
        const k = Math.floor(Math.random() * population.length);
        participants.push(population[k]);
        totalScore += population[k].score;
    }
    let threshold = totalScore * Math.random();
    let j = 0;
    while (threshold > participants[j].score) {
        threshold -= participants[j].score;
        j += 1;
    }
    return participants[j].value;
}

function nextGeneration<T>(model: Model<T>, population: Population<T>): Population<T> {
    const n = population.length / 2;
    const offspring = [];
    const threshold = Math.min(...population.map(individual => individual.score));
    for (let i = 0; i < n; i++) {
        // note: with replacement. so it's possible for both parents to be the
        // same individual. extreme inbreeding!
        const adam = tournament(population);
        const eve = tournament(population);
        offspring.push(...model.breed(adam, eve).map(child => {
            const value = model.mutate(child);
            const score = model.score(value);
            return { value, score };
        }));
    }
    return offspring.
        concat(population).
        sort((a, b) => b.score - a.score).
        slice(0, population.length);
}

export function runGP<T>(
    model: Model<T>,
    populationSize: number,
    generationCount: number,
): Scored<T> {
    let population = [];
    for (let i = 0; i < populationSize; i++) {
        const value = model.generate();
        const score = model.score(value);
        population.push({ value, score });
    }
    population.sort((a, b) => b.score - a.score);
    for (let i = 0; i < generationCount; i++) {
        population = nextGeneration(model, population);
    }
    return population[0];
}