import { Auth } from '@/interfaces/auth.interface';
import { get, post, patch, httpDelete } from './axios';

/* auth requests */
export const login = (body: Auth) => post('/auth/login', body);
export const register = (body: Auth) => post('/auth/register', body);

// /* users requests */
// export const updateUser = (body) => patch(`/user/${body.id}`, body.data);
// export const getUserByEmail = (body) => get(`/user/email/${body}`);