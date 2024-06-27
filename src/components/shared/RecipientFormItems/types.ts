export enum actionTypes {
  CHANGE_FIELD = 'CHANGE_FIELD'
}

export interface ActionProps {
  type: actionTypes;
  payload: {
    field: string;
    value: string;
  };
}

export interface ChangeProps {
  field: string,
  value: string
}
