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
  const {data} = useQuery(GET_GESTIONES);
  console.log(data);
  return (
    <Layout>
        <div className="flex justify-between">
                  <div>
                      <h2 className="align-center text-center text-2xl text-white font-light mt-5">Gestiones</h2>
                  </div>
                  <div>
                <Link href="/gestiones/NuevaGestion">
                    <p className="bg-blue-800 w-full mt-5 p-3 text-white uppercase hover:bg-blue-900 rounded-lg">
                        Crear Gestion
                    </p>
                </Link>
           
                </div>

        </div>
      </Layout>
  );
};
export default Gestiones;
