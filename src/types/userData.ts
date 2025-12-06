// For registration form data
export type TRegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// For login form data
export type TLoginFormData = {
  email: string;
  password: string;
}

// For authenticated user state (returned from API)
export type TuserData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  accessToken?: string;
  image?: string;
}
