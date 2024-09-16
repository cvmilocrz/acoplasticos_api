import { getConnection } from "../database/connection.js"; // Usamos el pool de conexiones
import bcrypt from "bcrypt";

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const sql = "SELECT * FROM users"; // Consultamos la tabla users
    const [users] = await connection.query(sql); // Obtenemos los datos de la consulta
    res.json(users); // Enviamos los datos a la respuesta
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    res.status(500).json({ error: "Error obteniendo usuarios" }); // Enviamos un mensaje de error al cliente
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params; // Obtenemos el id del usuario
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const sql = `SELECT * FROM users WHERE id = ?`; // Consultamos la tabla users
    const [user] = await connection.query(sql, [id]); // Obtenemos los datos de la consulta
    if (user.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user[0]); // Enviamos el usuario encontrado
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    res.status(500).json({ error: "Error obteniendo usuario" }); // Enviamos un mensaje de error al cliente
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const { first_name, last_name, user, email, password, user_type } = req.body; // Obtenemos los datos del usuario
    const hashedPassword = await bcrypt.hash(password, 10); // Hasheamos la contraseña
    const sql = `INSERT INTO users (first_name, last_name, user, email, password, user_type) VALUES (?, ?, ?, ?, ?, ?)`; // Insertamos en la tabla users
    const result = await connection.query(sql, [first_name, last_name, user, email, hashedPassword, user_type]); // Ejecutamos la consulta
    res.json({ message: "Usuario creado", userId: result.insertId }); // Enviamos el ID del usuario creado
  } catch (error) {
    console.error("Error creando usuario:", error);
    res.status(500).json({ error: "Error creando usuario" }); // Enviamos un mensaje de error al cliente
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const { id } = req.params; // Obtenemos el id del usuario
    const { first_name, last_name, user, email, password, user_type } = req.body; // Obtenemos los datos del usuario
    const hashedPassword = await bcrypt.hash(password, 10); // Hasheamos la contraseña
    const sql = `UPDATE users SET first_name = ?, last_name = ?, user = ?, email = ?, password = ?, user_type = ? WHERE id = ?`; // Actualizamos el usuario
    const result = await connection.query(sql, [first_name, last_name, user, email, hashedPassword, user_type, id]); // Ejecutamos la consulta
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario actualizado" }); // Confirmamos la actualización
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    res.status(500).json({ error: "Error actualizando usuario" }); // Enviamos un mensaje de error al cliente
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const { id } = req.params; // Obtenemos el id del usuario
    const sql = `DELETE FROM users WHERE id = ?`; // Eliminamos el usuario
    const result = await connection.query(sql, [id]); // Ejecutamos la consulta
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado" }); // Confirmamos la eliminación
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    res.status(500).json({ error: "Error eliminando usuario" }); // Enviamos un mensaje de error al cliente
  }
};
