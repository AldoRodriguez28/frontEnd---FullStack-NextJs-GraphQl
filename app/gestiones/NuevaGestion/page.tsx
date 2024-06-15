"use client";
import React,{useState} from "react";
import Layout from "@/components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";

const NUEVA_GESTION = gql`
mutation NuevaGestion($input: GestionInput) {
  nuevaGestion(input: $input) {
    id
    descripcion
    estatuss
    tipo
  }
}
`;

const NuevaGestion = () => {
  const [succesCreate, setSuccesCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);
  const [message, setMessage] = useState('');


  const [ nuevaGestion ] = useMutation(NUEVA_GESTION);

//modificar el schema para que gestion acepte nombre de cliente   ok
//ese deberia asignarse en bas desde el backeng resolvers  ok

//investigar como crea run campo autoincrementalble con mongo graphql apllo cliente y apollo server

  const formik = useFormik({
    initialValues: {
      tipo: "",
      matricula: "",
      lugar: "",
      estatus:"",
      descripcion:"",
    },
    validationSchema: Yup.object({
      tipo: Yup.string().required("El tipo es requerido"),
      matricula: Yup.string().required("La matricula es requerido"),
      lugar: Yup.string()
        .required("El lugar es requerido"),
      estatus: Yup.string().required('El estatus es requerido'),
      descripcion: Yup.string().required('El descripcion es requerido'),      
    }),
    onSubmit: async (values,{resetForm}) => {
      debugger;
      console.log(values);
      const { tipo,matricula,lugar,estatus,descripcion } = values;

      try {
        const {data} = await nuevaGestion({
          variables:{
            input:{
              tipo: tipo,
              matricula: matricula,
              lugar:lugar,
              estatus:estatus,
              descripcion:descripcion
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
        console.log(error)
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

        <h2 className=" text-2xl text-white font-light text-center">Nueva Gestion</h2>
        <div className="flex justify-center mt-5 text-blue-950">
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
                <p className="text-lg">La gestion se creo correctamente</p>
              </div>
            )}

            {/*Logica mostrando mensajes de error o de autenticado */}
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={formik.handleSubmit}
              >
                <div className="mb-4">
                  <label
                    htmlFor="tipo"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Tipo
                  </label>
                  <select name="tipo" 
                  id="tipo"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formik.values.tipo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  >
                    <option value="">Seleccione un tipo</option>
                    <option value="INCAPACIDAD">INCAPACIDAD</option>
                  </select>
                
                </div>
                {formik.touched.tipo && formik.errors.tipo ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.tipo}</p>
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
                    placeholder="matricula"
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
                    htmlFor="lugar"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Lugar
                  </label>
                  <input
                    type="lugar"
                    placeholder="lugar"
                    id="lugar"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formik.values.lugar}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                </div>
                {formik.touched.lugar && formik.errors.lugar ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.lugar}</p>
                  </div>
                ) : null}
                 <div className="mb-4">
                  <label
                    htmlFor="estatus"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Estatus
                  </label>
                  <select 
                  name="estatus" 
                  id="estatus"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formik.values.estatus}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  >
                    <option value="">Selecciona un estatus</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="ACTIVO">ACTIVO</option>
                    <option value="ATENDIDO">ATENDIDO</option>
                    <option value="CANCELADO">CANCELADO</option>

                  </select>
              
                </div>
                {formik.touched.estatus && formik.errors.estatus ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.estatus}</p>
                  </div>
                ) : null}
                 <div className="mb-4">
                  <label
                    htmlFor="descripcion"
                    className="block text-gray-700 text-sm font-bold mb-2 "
                  >
                    Descripcion
                  </label>
                  <input
                    type="descripcion"
                    placeholder="descripcion"
                    id="descripcion"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formik.values.descripcion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                </div>
                {formik.touched.descripcion && formik.errors.descripcion ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.descripcion}</p>
                  </div>
                ) : null}

                <input
                  type="submit"
                  className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                  value="Registrar gestion" />
              </form>
            </div>
          </div>
    
    </Layout>
  );
};
export default NuevaGestion;
