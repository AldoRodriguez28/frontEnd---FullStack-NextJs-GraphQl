"use client";
import React,{useState} from "react";
import Layout from "@/components/Layout";
import { useRouter } from 'next/navigation';

import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";

const NUEVO_USUARIO = gql`
mutation NuevoUsuario($input: UsuarioInput) {
  nuevoUsuario(input: $input) {
    id
    nombre
  }
}
`;
const OBTENER_USUARIO = gql`
query ObtenerUsuarios {
  obtenerUsuarios {
    id
    nombre
    apellido
    email
    creado
    rol
  }
}
`;
const NuevoCliente = () => {
  const [succesCreate, setSuccesCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter()


  const [ nuevoUsuario ] = useMutation(NUEVO_USUARIO, {
    update(cache, {data: {nuevoUsuario}}){
      const { obtenerUsuarios } = cache.readQuery({query: OBTENER_USUARIO})

      cache.writeQuery({
        query: OBTENER_USUARIO,
        data:{
          obtenerUsuarios: [...obtenerUsuarios, nuevoUsuario]
        }
      })
    }

  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      rol:"",
      password:"",
      confirmPassword:""
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es requerido"),
      apellido: Yup.string().required("El apellido es requerido"),
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es requerido"),
        rol: Yup.string().required('el rol es requerido'),
      password: Yup.string().required('El password es requerido'),
      confirmPassword: Yup.string().required('Debes confirmar tu password').oneOf([Yup.ref('password'), ''],'El password no coincide')
      
    }),
    onSubmit: async (values,{resetForm}) => {
      console.log(values);
      const { nombre,apellido,email,password,rol } = values;

      try {
        const {data} = await nuevoUsuario({
          variables:{
            input:{
              nombre: nombre,
              apellido: apellido,
              email:email,
            password:password,
            rol:rol
            }
          }
        });
        console.log(data)
        guardarMensaje('', false);
        setTimeout(()=>{
          setSuccesCreate(false);
          resetForm();
          router.push('/usuarios')
        },5000);
      } catch (error:any) {
          guardarMensaje(error.message, true);
          setTimeout(()=>{
            setErrorCreate(false);
          },5000);
      }   
    },
  });
  const guardarMensaje = (message:any, isError:boolean)=>{
    setMessage(message);
    if(isError){
      setErrorCreate(true);
    }else{
      setSuccesCreate(true);
    }
   };
  return (
    <Layout>

        <h2 className=" text-2xl text-white font-light">Nuevo Usuario</h2><div className="flex justify-center mt-5 text-blue-950">
            <div className="w-full max-w-3xl">
                     {/*Logica mostrando mensajes de error o de autenticado */}
            {!errorCreate ? (
              <div></div>
            ) : (
              <div className="py-4 px-3 w-full max-w-3xl my-3 my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4">
                <p className="text-xl">{message}</p>
              </div>
            )}

            {!succesCreate ? (
              <div></div>
            ) : (
              <div className="py-4 px-3 w-full max-w-3xl my-3 my-2 bg-green-100 border-l-8 border-green-500 text-green-700 p-4">
                <p className="text-xl">El usuario se creo correctamente</p>
              </div>
            )}

            {/*Logica mostrando mensajes de error o de autenticado */}
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={formik.handleSubmit}
              >
                <div className="mb-4">
                  <label
                    htmlFor="nombre"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    placeholder="Nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                </div>
                {formik.touched.nombre && formik.errors.nombre ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.nombre}</p>
                  </div>
                ) : null}
                <div className="mb-4">
                  <label
                    htmlFor="apellido"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    placeholder="Apellido"
                    id="apellido"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formik.values.apellido}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                </div>
                {formik.touched.apellido && formik.errors.apellido ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.apellido}</p>
                  </div>
                ) : null}
                
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email}</p>
                  </div>
                ) : null}
                 <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Rol
                  </label>
                  <select 
                  name="rol" 
                  id="rol"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formik.values.rol}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  >
                    <option value="">Selecciona un rol</option>
                    <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                    <option value="DELEGADO">DELEGADO</option>
                    <option value="ENLACE">ENLACE</option>
                  </select>
              
                </div>
                {formik.touched.rol && formik.errors.rol ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.rol}</p>
                  </div>
                ) : null}
                 <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password}</p>
                  </div>
                ) : null}
                
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Confirmar Password
                  </label>
                  <input
                    type="password"
                    placeholder="confirmar Password"
                    id="confirmPassword"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.confirmPassword}</p>
                  </div>
                ) : null}


                <input
                  type="submit"
                  className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                  value="Registrar usuario" />
              </form>
            </div>
          </div>
    
    </Layout>
  );
};
export default NuevoCliente;
