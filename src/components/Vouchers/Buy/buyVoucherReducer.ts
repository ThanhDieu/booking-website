import { BuyVoucherProps } from "@/pages/vouchers/[voucherId]";

export enum actionTypes {
  CHANGE_VOUCHER = 'CHANGE_VOUCHER',
  CHANGE_STEP = 'CHANGE_STEP',
  ENABLE_STEP = 'ENABLE_STEP',
  DISABLE_STEP = 'DISABLE_STEP',
  UPDATE_RECIPIENT = 'UPDATE_RECIPIENT',
  UPDATE_BOOKER = 'UPDATE_BOOKER',
  UPDATE_ADDRESS = 'UPDATE_ADDRESS',
  UPDATE_BUY_FOR = 'UPDATE_BUY_FOR',
  UPDATE_SHIPPING = 'UPDATE_SHIPPING'
}
export interface ActionProps {
  type: actionTypes;
  payload: any
}

const buyVoucherReducer = (state: BuyVoucherProps, action: ActionProps) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CHANGE_VOUCHER:
      return {
        ...state,
        voucher: payload
      }

    case actionTypes.CHANGE_STEP:
      return {
        ...state,
        buySteps: {
          ...state.buySteps,
          activeStep: payload
        },
      };
    
    case actionTypes.ENABLE_STEP:
      return {
        ...state,
        buySteps: {
          ...state.buySteps,
          steps: [
            ...state.buySteps.steps.slice(0, payload - 1), // step is greater 1 compare to array's index
            {...state.buySteps.steps[payload - 1], enabled: true},
            ...state.buySteps.steps.slice(payload)
          ]
        }
      }
    
    case actionTypes.DISABLE_STEP:
      return {
        ...state,
        buySteps: {
          ...state.buySteps,
          steps: [
            ...state.buySteps.steps.slice(0, payload - 1),
            {...state.buySteps.steps[payload - 1], enabled: false},
            ...state.buySteps.steps.slice(payload)
          ]
        }
      }

    case actionTypes.UPDATE_RECIPIENT:
      return {
        ...state,
        recipient: payload
      }
    
    case actionTypes.UPDATE_BOOKER:
      return {
        ...state,
        booker: payload
      }

    case actionTypes.UPDATE_ADDRESS:
      return {
        ...state,
        address: payload
      }

    case actionTypes.UPDATE_BUY_FOR:
      return {
        ...state,
        buyFor: payload
      }

    case actionTypes.UPDATE_SHIPPING:
      return {
        ...state,
        shippingMethod: payload
      }

    default:
      return state;
  }
};

export default buyVoucherReducer;
