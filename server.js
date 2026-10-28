const express = require('express');
const app = express();
 
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
 
// 1. Todas las tareas
app.get('/tareas', (req, res) => {
  res.json(tareas);
});
 
// 3. Pendientes (va antes de /tareas/:titulo)
app.get('/tareas/pendientes', (req, res) => {
  const pendientes = tareas.filter(t => t.estado === "pendiente");
  res.json(pendientes);
});
 
// 4. Completadas
app.get('/tareas/completadas', (req, res) => {
  const completadas = tareas.filter(t => t.estado === "completada");
  res.json(completadas);
});
 
// 2. Una tarea por nombre
app.get('/tareas/:titulo', (req, res) => {
  const tarea = tareas.find(t => t.titulo === req.params.titulo);
  if (!tarea) {
    return res.status(404).json({ mensaje: "No existe esa tarea" });
  }
  res.json(tarea);
});
 
// 5. Agregar tarea
app.post('/tareas', (req, res) => {
  const nueva = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
    pasos: req.body.pasos
  };
  tareas.push(nueva);
  res.status(201).json(nueva);
});
 
// 6. Actualizar tarea completa
app.put('/tareas/:titulo', (req, res) => {
  const tarea = tareas.find(t => t.titulo === req.params.titulo);
  if (!tarea) {
    return res.status(404).json({ mensaje: "No existe esa tarea" });
  }
  tarea.titulo = req.body.titulo;
  tarea.descripcion = req.body.descripcion;
  tarea.estado = req.body.estado;
  tarea.pasos = req.body.pasos;
  res.json(tarea);
});
 
// 7. Actualizar solo el estado
app.patch('/tareas/:titulo/estado', (req, res) => {
  const tarea = tareas.find(t => t.titulo === req.params.titulo);
  if (!tarea) {
    return res.status(404).json({ mensaje: "No existe esa tarea" });
  }
  tarea.estado = req.body.estado;
  res.json(tarea);
});
 
// 8. Eliminar tarea
app.delete('/tareas/:titulo', (req, res) => {
  const posicion = tareas.findIndex(t => t.titulo === req.params.titulo);
  if (posicion === -1) {
    return res.status(404).json({ mensaje: "No existe esa tarea" });
  }
  tareas.splice(posicion, 1);
  res.json({ mensaje: "Tarea eliminada" });
});
 
app.listen(3000, () => {
  console.log("servidor corriendo en http://localhost:3000");
});
 
