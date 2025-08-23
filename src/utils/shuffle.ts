export const mutatingShuffle = <T extends unknown[]>(arr: T): T =>
    arr.sort(() => Math.random() - 0.5);

export const nonMutatingShuffle = <T extends unknown[]>(arr: T): T =>
    [...arr].sort(() => Math.random() - 0.5) as T;
