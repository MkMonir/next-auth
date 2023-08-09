'use client';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

const Auth = () => {
  const router = useRouter();
  const initialFormData = {
    username: '',
    email: '',
    password: '',
  };
  const [varient, setVarient] = useState('login');
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const toggleVarient = useCallback(() => {
    setVarient((currentVarient) => (currentVarient === 'login' ? 'register' : 'login'));
  }, []);

  const login = useCallback(
    async (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
          callbackUrl: '/',
        });

        router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
    [formData.email, formData.password, router]
  );

  const register = useCallback(
    async (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await axios.post('/api/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        login(e);
      } catch (error) {
        console.log(error);
      }
    },
    [formData.email, formData.username, formData.password, login]
  );

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              {varient === 'login' ? 'Sign in to' : 'Register'} your account
            </h1>
            <form className="space-y-4 w-[350px]" onSubmit={varient === 'login' ? login : register}>
              {varient !== 'login' && (
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                    placeholder="jhonDoe"
                    required
                    onChange={handleChange}
                    value={formData?.username}
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  required
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-teal-300"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div>
                {varient === 'login' && (
                  <a href="#" className="text-sm font-medium text-teal-600 hover:underline ">
                    Forgot password?
                  </a>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {varient === 'login' ? 'Sign in' : 'Register'}
              </button>
              <p className="text-sm font-light text-gray-500 ">
                {varient === 'login' ? 'Don’t have an account yet? ' : 'Already have an account? '}
                <button
                  type="button"
                  className="font-medium text-teal-600 hover:underline "
                  onClick={() => {
                    toggleVarient(), setFormData(initialFormData);
                  }}
                >
                  {varient === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
