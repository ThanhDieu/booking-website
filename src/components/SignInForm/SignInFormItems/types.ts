export enum actionTypes {
  CHANGE_FIELD = 'CHANGE_FIELD',
  CHANGE_TYPE = 'CHANGE_TYPE',
}

export interface ActionProps {
  type: actionTypes;
  payload: any;
}

export interface ChangeProps {
  field: string,
  value: string
}
