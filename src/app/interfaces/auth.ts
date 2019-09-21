export interface IRegistrationFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export interface ILoginFormData {
    email: string;
    password: string;
}

// export interface ITokenUser {
//     firstName: string;
//     lastName: string;
//     roles: string[];
//     token: string;
//     userId: string;
// }