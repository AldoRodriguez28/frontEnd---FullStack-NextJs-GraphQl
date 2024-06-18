import React from "react";
import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";

const ELIMINAR_CLIENTE = gql`
mutation EliminarCliente($eliminarClienteId: ID!) {
  eliminarCliente(id: $eliminarClienteId)
}
`;

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



const Cliente = ({cliente})=>{
const {id, matricula, nombre, municipio, telefono } = cliente;

const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE,{
    update(cache){
        const {obtenerClientes} = cache.readQuery({query: GET_CLIENTS});

        cache.writeQuery({
            query: GET_CLIENTS,
            data:{
                obtenerClientes: obtenerClientes.filter(cliente => cliente.id !== id)
            }
        })
    }
});

const eliminarClienteAction = (id)=>{
    Swal.fire({
      title: "Estas seguro que deseas borrar el cliente?",
      text: `el id del cliente es ${id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar cliente!"
    }).then(async (result) => {
    
      if (result.isConfirmed) {
        try {
            
            const {data } = await eliminarCliente({
                variables:{
                    eliminarClienteId: id
                }
            });
            console.log(data)
            Swal.fire({
              title: "Eliminado!",
              text: "cliente eliminado",
              icon: "success"
            });
        } catch (error) {
            console.log(error)
        }
      }
    });
  }
    return(
        
          <tr className="border-b border-neutral-200 dark:border-white/10 bg-orange-50">
              <td className="whitespace-nowrap  px-6 py-4 font-medium uppercase  ">{matricula}</td>
              {/* <td className="whitespace-nowrap  px-6 py-4 font-medium uppercase">{curp}</td> */}
              <td className="whitespace-nowrap  px-6 py-4 font-medium uppercase">{nombre}</td>
              <td className="whitespace-nowrap  px-6 py-4 font-medium uppercase">{municipio}</td>
              <td className="whitespace-nowrap  px-6 py-4 font-medium uppercase">{telefono}</td>
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
                <button 
                type="button" 
                onClick={()=>(eliminarClienteAction(id))}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

                <p>Eliminar</p>
                </button>

              </div>
              </td>

            </tr>
    )
}
export default Cliente;