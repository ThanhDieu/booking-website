export enum BUY_FOR {
  me = 'me',
  recipient = 'recipient'
}

export enum SHIPPING_METHOD {
  email = 'email',
  post = 'post'
}

export const buyForOptions = [
  {
    value: BUY_FOR.me,
    label: 'To me'
  },
  {
    value: BUY_FOR.recipient,
    label: 'To the repicient'
  }
]

export const shippingMethodOptions = [
  {
    value: SHIPPING_METHOD.email,
    label: 'By email'
  },
  {
    value: SHIPPING_METHOD.post,
    label: 'By post'
  }
]

export const initialRecipient = {
  fields: {
    title: "male",
    firstName: "",
    lastName: "",
    message: "",
    email: "",
  },
  showEmail: false,
  title: ""
}

export const initialBookerInfo = {
  fields: {
    title: "male",
    firstName: "",
    lastName: "",
    email: "",
  },
  title: "",
}

export const initialAddressInfo = {
  fields: {
    street: "",
    postalCode: "",
    region: "",
    city: "",
    note: ""
  },
  title: "",
}
