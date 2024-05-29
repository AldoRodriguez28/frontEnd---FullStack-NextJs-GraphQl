"use client";
import React from "react";
import Layout from "@/components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, gql } from "@apollo/client";
//import {getClient} from '../../config/ApolloClient'

const QUERY = gql`
  query ObtenerClientes {
    obtenerClientes {
      id
      nombre
      apellido
      email
      matricula
      municipio
      estado
      telefono
      curp
      creado
    }
  }
`;

const NuevoCliente = () => {
 

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      matricula: "",
      email: "",
      estado: "",
      municipio: "",
      curp: "",
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
    }),
    onSubmit: (values) => {
      console.log("enviando...");
      console.log(values);
    },
  });
  return (
    <Layout>
      <h2 className=" text-2xl text-white font-light">Nuevo Cliente</h2>
      <div className="flex justify-center mt-5 text-blue-950">
        <div className="w-full max-w-sm">
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
                onBlur={formik.handleBlur}
              />
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
                onBlur={formik.handleBlur}
              />
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
                onBlur={formik.handleBlur}
              />
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
                onBlur={formik.handleBlur}
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
                onBlur={formik.handleBlur}
              />
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
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.curp && formik.errors.curp ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.curp}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
              value="Crear cliente"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default NuevoCliente;
