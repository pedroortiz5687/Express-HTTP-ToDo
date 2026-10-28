const express =require('express');
const  app=express();

app.use(express.json());

const tareas = [
  {
    titulo: "Estudiar Express",
    descripcion: "Aprender a crear rutas",
    estado: "pendiente",
    pasos: ["Instalar Express", "Crear rutas"]
  },
  {
    titulo: "Instalar Node",
    descripcion: "Descargar e instalar Node.js",
    estado: "completada",
    pasos: ["Descargar", "Instalar"]
  }
];

app.listen(3000,()=>{
    console.log("servidor corriendo en http://localhost:3000");
 });
 
