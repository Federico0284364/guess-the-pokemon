export type EasyAnswerOption = {
  text: string;
  isCorrect: boolean;
};

export type HardAnswerOption = {
  name: string,
  generation: string,
  types: string[],
  stat: string,
}
