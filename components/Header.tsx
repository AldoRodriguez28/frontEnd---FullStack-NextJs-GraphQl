import React from "react";
import {gql, useQuery} from '@apollo/client'
import { useRouter } from 'next/navigation';

const OBTENER_USUARIO = gql`
query ObtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
      email
      rol
    }
  }
`;

const Header =()=>{
    const router = useRouter();
    const {data, loading, error} = useQuery(OBTENER_USUARIO)
   
    const cerrarSesion =async ()=>{
        localStorage.removeItem('token');
        localStorage.clear();
        router.push('/login');
    }

    if(loading)return null;

    if(!data.obtenerUsuario){
        return router.push('/login')
    }

    return(
        <>
        <div className="flex justify-between">
            <div>
               <h3 className="align-center text-center text-white font-light mt-5">Hola {data.obtenerUsuario && data.obtenerUsuario.nombre} </h3> 
            </div>
            <div className="container_cerrar_sesion">
            <p onClick={()=>cerrarSesion()} className="bg-blue-800 w-full mt-5 p-3 text-white uppercase hover:bg-blue-900 rounded-lg">
                       Cerrar sesión
                    </p>
            </div>
        </div>
        </>
    )

}
export default Header;