
export interface SignInType {
    email: string;
    password: string;
}

export interface RegisterType extends SignInType {
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

