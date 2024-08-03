export interface UserModel {
    email: string;
    username: string;
    password?: string;
    imgUrl?: string;
    firstName?: string;
    lastName?: string;
    _id?: string;
    accessToken?: string;
    refreshToken?: string;
}
