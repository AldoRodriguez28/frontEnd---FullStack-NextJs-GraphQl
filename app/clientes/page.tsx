'use client'
import React,{useState} from "react";
import Layout from "@/components/Layout";
import Link from 'next/link';
import Cliente from '@/components/Cliente';
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
        

        </div>
        <div>
         
           
         </div>
         <div className="flex justify-evenly items-center mt-5">
         <form className="max-w-xl w-full">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar cliente" required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <Link href="/clientes/NuevoCliente">
                <p className="bg-blue-800 w-full p-3 text-white uppercase hover:bg-blue-900 rounded-lg">
                    Crear cliente
                </p>
            </Link>
         </div>
       
        <div className="mt-5 overflow-y-auto max-h-screen">

        <table className='mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
          <thead className="bg-gray-950">
            <tr className="text-white text-left">
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Matricula</th>
              {/* <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Curp</th> */}
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Nombre</th>
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Municipio</th>
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Telefono</th>
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Acciones</th>

            </tr>
          </thead>
          <tbody className="overflow-y-scroll h-1/2">
            { data.obtenerClientes.map((cliente:any)=>(
              <Cliente cliente={cliente}  key={cliente.id}/>
            ))}
          </tbody>
        </table>

        </div>
    </div>
      </Layout>
      
  );
};
export default Clientes;
