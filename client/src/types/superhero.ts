export type SuperHero = {
  name: string;
  superpower: Superpower[];
  humilityScore: number;
};
export enum Superpower {
  Fly = 'fly',
  LaserEyes = 'laser-eyes',
  Teleportation = 'teleportation',
  Telekinesis = 'telekinesis',
  Speed = 'speed',
  Strength = 'strength',
}
