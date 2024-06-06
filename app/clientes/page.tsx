'use client'
import React,{useState} from "react";
import Layout from "@/components/Layout";
import Link from 'next/link'
import { useQuery, gql } from "@apollo/client";

const GET_CLIENTS = gql`
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

const Clientes = () => {
  const {data,loading,error} =  useQuery(GET_CLIENTS);

  if(loading){
    return(
      <>
       <Layout>
        <h2 className=" text-2xl text-white font-light" >Loading ...</h2>
       </Layout>
      </>
    )
  }

  return (
    <Layout>
        <div className="">
        <div className="flex justify-between">
          <div>
              <h2 className="align-center text-center text-2xl text-white font-light mt-5">Clientes</h2>
          </div>
          <div>
          <Link href="/clientes/NuevoCliente">
                    <p className="bg-blue-800 w-full mt-5 p-3 text-white uppercase hover:bg-blue-900 rounded-lg">
                        Crear cliente
                    </p>
                </Link>
           
                </div>

        </div>
       
        <form className="mx-auto max-w-4xl w-full mt-5 mb-5">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar cliente" required />
                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>
        <div className="mt-5 overflow-y-auto max-h-screen">

        <table className='mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
          <thead className="bg-gray-950">
            <tr className="text-white text-left">
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Matricula</th>
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Curp</th>
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Nombre</th>
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Municipio</th>
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Telefono</th>
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Acciones</th>

            </tr>
          </thead>
          <tbody className="overflow-y-scroll h-1/2">
            { data.obtenerClientes.map((cliente:any, index:number)=>(
            <tr className="border-b border-neutral-200 dark:border-white/10 bg-orange-50" key={index}>
              <td className="whitespace-nowrap  px-6 py-4 font-medium uppercase  ">{cliente.matricula}</td>
              <td className="whitespace-nowrap  px-6 py-4 font-medium uppercase">{cliente.curp}</td>
              <td className="whitespace-nowrap  px-6 py-4 font-medium uppercase">{cliente.nombre}</td>
              <td className="whitespace-nowrap  px-6 py-4 font-medium uppercase">{cliente.municipio}</td>
              <td className="whitespace-nowrap  px-6 py-4 font-medium uppercase">{cliente.telefono}</td>
              <td className="whitespace-nowrap  px-6 py-4 font-medium flex gap-8">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <p>info</p>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                <p>Editar</p>

              </div>

              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                <p>Eliminar</p>

              </div>
              </td>

            </tr>
            ))}
          </tbody>
        </table>

        </div>
    </div>
      </Layout>
      
  );
};
export default Clientes;
