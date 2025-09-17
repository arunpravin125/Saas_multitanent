import React from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Footer from "./Footer";

const Forms = () => {
  return (
    <div className="bg-gray-200 flex flex-col gap-5 max-h-[570px] overflow-y-auto p-4">
      <Form1 />
      <Form2 />
      <Form3 />
      <Footer />
    </div>
  );
};

export default Forms;
