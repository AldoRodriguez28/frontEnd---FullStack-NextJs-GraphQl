'use client'
import React from "react";
import Layout from '@/components/Layout'
import Link from "next/link";
import {gql, useQuery} from '@apollo/client'

const GET_GESTIONES = gql`
query ObtenerGestiones {
  obtenerGestiones {
    id
    clienteId
    usuarioId
    lugar
    tipo
    descripcion
    estatus
    creado
  }
}
`;

const Gestiones = () => {
  const {data,loading, error} = useQuery(GET_GESTIONES);
console.log(data)
if(loading){
  return(
    <>
    <Layout>
     <h2 className=" text-2xl text-white font-light" >Loading ...</h2>
    </Layout>
   </>
  );
}
  return (
    <Layout>
        <div className="flex justify-between">
                  <div>
                      <h2 className="align-center text-center text-2xl text-white font-light mt-5">Gestiones</h2>
                  </div>
                  <div>
               
           
                </div>

        </div>
        <div className="flex justify-evenly items-center mt-5">
        <form className="max-w-xl w-full">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar gestion" required />
                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>
        <Link href="/gestiones/NuevaGestion">
            <p className="bg-blue-800 w-full p-3 text-white uppercase hover:bg-blue-900 rounded-lg">
                Crear Gestion
            </p>
        </Link>
        </div>
        <div className="container_table">
        <table className='table-auto mx-auto mt-10 max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
        <thead className="bg-gray-950">
              <tr className="text-white">
                <th className="font-semibold text-sm uppercase px-6 py-4">Descripcion</th>
                <th className="font-semibold text-sm uppercase px-6 py-4">Tipo</th>
                <th className="font-semibold text-sm uppercase px-6 py-4">Estatus</th>
                <th className="font-semibold text-sm uppercase px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll h-1/2">
              {data.obtenerGestiones.map((gestion:any)=>(
                <tr className="border-b border-neutral-200 dark:border-white/10 bg-orange-50" key={gestion.id}>
                  <td className="whitespace-nowrap  px-6 py-4 font-medium uppercase  ">{gestion.descripcion}</td>
                  <td className="whitespace-nowrap  px-6 py-4 font-medium uppercase  ">{gestion.tipo}</td>
                  <td className="whitespace-nowrap  px-6 py-4 font-medium uppercase  ">{gestion.estatus}</td>
                  <td className="whitespace-nowrap  px-6 py-4 font-medium flex gap-8">
                  
                          <div className="flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                        <p>info</p>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <p>Editar</p>

                      </div>

                      <div className="flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                        <p>Eliminar</p>

                      </div>
                  </td>
                </tr>
              ))}

            </tbody>
             
          </table>
        </div>
      </Layout>
  );
};
export default Gestiones;
