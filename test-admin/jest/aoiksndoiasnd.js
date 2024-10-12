import authProvider from '../src/authProvider';
import { AUTH_LOGIN } from 'react-admin';

describe('authProvider', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.clear();
  });

  it('should login successfully and store the token', async () => {
    const mockResponse = {
      token: 'mock-token',
    };

    global.fetch.mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const params = {
      username: 'testuser',
      password: 'testpassword',
    };

    await authProvider(AUTH_LOGIN, params);

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/login', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    expect(localStorage.getItem('token')).toBe('mock-token');
  });

  it('should throw an error if login fails', async () => {
    global.fetch.mockResolvedValueOnce({
      status: 401,
      statusText: 'Unauthorized',
    });

    const params = {
      username: 'testuser',
      password: 'testpassword',
    };

    await expect(authProvider(AUTH_LOGIN, params)).rejects.toThrow('Unauthorized');
    expect(localStorage.getItem('token')).toBeNull();
  });
});