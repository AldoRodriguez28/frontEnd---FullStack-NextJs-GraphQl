import Layout from "@/components/Layout";
import React from "react";

const Login = () => {
  return (
    <Layout>
      <div className="min-h-screen  bg-gray-800 flex flex-col justify-center">
        <h2 className="text-2xl text-center text-white font-light">Login</h2>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2 "
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email de usuario"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2 "
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                value="iniciar sesión"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Login;
