export interface AuthDto {
    username: string;
    password: string;
}
export interface CreateUserDto {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    refreshToken?: string;
    age?: number;
    gender?: string;
    weight?: number;
    height?: number;
    allergies?: string[];
    diseases?: string[];
    imgUrl?: string;
}