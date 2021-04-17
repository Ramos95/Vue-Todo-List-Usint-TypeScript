export enum priority {
  low,
  medium,
  high,
}

export enum status {
  idle,
  inProgress,
  done,
  deleted,
}

export type filterOptions = status | priority | -1;

export interface TodoItemType {
  id: number;
  title: string;
  description: string;
  priority: priority;
  status: status;
}

export interface SelectOptions {
  text: string;
  status: status | priority | number;
}
