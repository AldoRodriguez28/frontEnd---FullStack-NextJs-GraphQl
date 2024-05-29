import React, { ReactNode } from "react";
import Layout from "../components/Layout";


interface Props {
  children?: ReactNode
  // any props that come into the component
}

export default function Index({children, ...props}: Props) {
  return (
    <Layout>
      <main>
           {children}
      </main>
    </Layout>
  );
}
