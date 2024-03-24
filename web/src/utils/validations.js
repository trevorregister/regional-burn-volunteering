import { required, email, integer, minValue } from '@vuelidate/validators'

export const createAccountValidation = {
  email: { required, email },
  password: { required },
  name: { required }
}

export const loginValidation = {
  email: { required, email },
  password: { required }
}

export const createShiftValidation = {
  name: { required },
  start: { required },
  end: { required },
  capacity: { required, integer, minValue: minValue(1) },
  duration: { required, integer, minValue: minValue(1) },
  amount: { required, integer, minValue: minValue(1) }
}
