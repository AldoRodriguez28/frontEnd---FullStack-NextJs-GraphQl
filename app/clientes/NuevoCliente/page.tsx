"use client";
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useSearchParams } from "next/navigation";

const NUEVO_CLIENTE = gql`
mutation NuevoCliente($input: ClienteInput) {
  nuevoCliente(input: $input) {
    id
    nombre
    apellido
    email
  }
}
`;

const NuevoCliente = () => {
  const [succesCreate, setSuccesCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);
  const [message, setMessage] = useState('');

  const [ nuevoCliente ] = useMutation(NUEVO_CLIENTE);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      matricula: "",
      email: "",
      estado: "",
      municipio: "",
      curp: "",
      telefono:""
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es requerido"),
      apellido: Yup.string().required("El apellido es requerido"),
      matricula: Yup.string()
        .required("La matricula es requerida")
        .min(6, "La matricula debe tener al menos 6 caracteres"),
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es requerido"),
      estado: Yup.string().required("El estado es requerido"),
      municipio: Yup.string().required("El municipio es requerido"),
      curp: Yup.string().required("La curp es requerida"),
      telefono:Yup.string().required("El telefono es requerido"),
    }),
    onSubmit: async (values, {resetForm}) => {
     
      const { nombre,apellido,matricula,email,estado,municipio,curp, telefono } = values;

      try {
      const {data} = await nuevoCliente({
        variables:{
          input:{
            nombre: nombre,
            apellido: apellido,
            estado: estado,
            matricula: matricula,
            email: email,
            municipio: municipio,
            curp: curp,
            telefono: telefono
          }
        }
       });
       console.log(data)
       guardarMensaje('', false);
       setTimeout(()=>{
        setSuccesCreate(false);
        resetForm();
      },5000);
      } catch (error:any) {
        guardarMensaje(error.message, true);

        setTimeout(()=>{
          setErrorCreate(false);
        },3000);
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

        <h2 className=" text-2xl text-white font-light">Nuevo Cliente</h2><div className="flex justify-center mt-5 text-blue-950">
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
                <p className="text-xl">El cliente se creo correctamente</p>
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
                    htmlFor="matricula"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Matricula
                  </label>
                  <input
                    type="text"
                    placeholder="Matricula"
                    id="matricula"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formik.values.matricula}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                </div>
                {formik.touched.matricula && formik.errors.matricula ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.matricula}</p>
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
                    htmlFor="estado"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Estado
                  </label>
                  <select
                    name="estado"
                    id="estado"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formik.values.estado}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Selección estado</option>
                    <option value="ver">Veracruz</option>
                  </select>
                </div>
                {formik.touched.estado && formik.errors.estado ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.estado}</p>
                  </div>
                ) : null}
                <div className="mb-4">
                  <label
                    htmlFor="municipio"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Municipio
                  </label>
                  <input
                    type="text"
                    placeholder="Municipio"
                    id="municipio"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formik.values.municipio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                </div>
                {formik.touched.municipio && formik.errors.municipio ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.municipio}</p>
                  </div>
                ) : null}
                <div className="mb-4">
                  <label
                    htmlFor="curp"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Curp
                  </label>
                  <input
                    type="text"
                    placeholder="CURP"
                    id="curp"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formik.values.curp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                </div>
                {formik.touched.curp && formik.errors.curp ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.curp}</p>
                  </div>
                ) : null}

                <div className="mb-4">
                  <label
                    htmlFor="curp"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Telefono
                  </label>
                  <input
                    type="text"
                    placeholder="Telefono"
                    id="telefono"
                    maxLength={10}
                    minLength={10}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formik.values.telefono}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                </div>
                {formik.touched.curp && formik.errors.telefono ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.telefono}</p>
                  </div>
                ) : null}


                <input
                  type="submit"
                  className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                  value="Crear cliente" />
              </form>
            </div>
          </div>
    
    </Layout>
  );
};
export default NuevoCliente;
