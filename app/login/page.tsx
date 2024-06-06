'use client'
import Layout from "@/components/Layout";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { gql,useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation';

const AUTENTICAR_USUARIO= gql`
mutation AutenticarUsuario($input: AutenticarInput) {
  autenticarUsuario(input: $input) {
    token
  }
}
`;

const Login = () => {
const [loadingMessage, setLoadingMessage] = useState(false);
const [loadingAutenticacion, setLoadingAutenticacion] = useState(false);
const [message, setMessage] = useState('');
const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

const router= useRouter()


  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Ingrese un email valido').required('El email es requerido'),
      password: Yup.string().required('el password es requerido')
    }),
    onSubmit: async (valores) =>{
      console.log(valores);
      const {email, password} = valores
      try {
        const {data} = await autenticarUsuario({
          variables:{
            input:{
             email: email,
             password: password
            }
          }
        });
        console.log(data); 
        setLoadingAutenticacion(true);
        router.push('/dashboard')
      } catch (error:any) {
        console.log(error.message);
        //Renderizando mensaje de error
        guardarMensaje(error.message);
        setTimeout(()=>{
          setLoadingMessage(false)
        },5000)
      }
    }
    });
    const guardarMensaje = (message:any)=>{
     setMessage(message);
     setLoadingMessage(true);
    };
  return (
    <Layout>
      <div className="min-h-screen  bg-gray-800 flex flex-col justify-center">
        <h2 className="text-2xl text-center text-white font-light">Login</h2>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            {/*Logica mostrando mensajes de error o de autenticado */}
            {!loadingMessage ? (
              <div></div>
            ) : (
              <div className="py-2 px-3 w-full my-3 max-w-sm my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{message}</p>
              </div>
            )}

            {!loadingAutenticacion ? (
              <div></div>
            ) : (
              <div className="py-2 px-3 w-full my-3 max-w-sm my-2 bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
                <p>Autenticando ...</p>
              </div>
            )}

            {/*Logica mostrando mensajes de error o de autenticado */}
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            >
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}
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
