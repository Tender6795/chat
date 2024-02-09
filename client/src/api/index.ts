import { Login } from '@/interfaces/login.interface';
import { get, post, patch, httpDelete } from './axios';

/* auth requests */
export const login = (body: Login) => post('/auth/login', body);
// export const registration = (body) => post('/auth/registration', body);

// /* users requests */
// export const updateUser = (body) => patch(`/user/${body.id}`, body.data);
// export const getUserByEmail = (body) => get(`/user/email/${body}`);