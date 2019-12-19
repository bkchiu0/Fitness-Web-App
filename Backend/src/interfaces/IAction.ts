export enum ActionType {
  EnduranceTraining = 0,
  StrengthTraining = 1,
  BalanceTraining = 2,
  FlexibilityTraining = 3
}

export interface IAction {
  type: ActionType;
  duration: number;
}
