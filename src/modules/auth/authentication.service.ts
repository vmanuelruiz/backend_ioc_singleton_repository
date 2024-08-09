import express from 'express';
import { UnauthorizedError } from '../../shared/errors/unauthorized.error';
import { AUTH_HEADER_NAME, AUTH_TYPE, DEFAULT_API_PASSWORD, DEFAULT_USER_CREDS } from '../../shared/constants';

export async function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[],
): Promise<any> {

    if (securityName === AUTH_TYPE) {
        let token;
        if (request.headers && request.headers[AUTH_HEADER_NAME]) {
            token = request.headers[AUTH_HEADER_NAME];
        }

        if (token === DEFAULT_API_PASSWORD) {
            return Promise.resolve(DEFAULT_USER_CREDS);
        } else {
            return Promise.reject(new UnauthorizedError('No api_key provided'));
        }
    }

}
