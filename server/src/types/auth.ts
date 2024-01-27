export interface IAccessTokenParams {
    userId: number;
}

export interface IRefreshTokenParams {
    userId: number;
}

export interface IRefreshToken {
    userId: number;
    accessToken: string;
}

export interface ITokenResponse {
    accessToken: string;
    refreshToken: string;
}