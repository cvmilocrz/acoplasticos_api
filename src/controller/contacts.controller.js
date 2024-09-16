import { getConnection } from "../database/connection.js";

// Obtener todos los contactos
export const getContacts = async (req, res) => {
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const sql = "SELECT * FROM contacts"; // Consultamos la tabla contacts
    const [contacts] = await connection.query(sql); // Obtenemos los datos de la consulta
    res.json(contacts); // Enviamos los datos a la respuesta
  } catch (error) {
    console.error("Error obteniendo contactos:", error);
    res.status(500).json({ error: "Error obteniendo contactos" }); // Enviamos un mensaje de error al cliente
  }
};

// Obtener un contacto por ID
export const getContactById = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID del contacto
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const sql = `SELECT * FROM contacts WHERE id = ?`; // Consultamos la tabla contacts
    const [contact] = await connection.query(sql, [id]); // Obtenemos los datos de la consulta
    if (contact.length === 0) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }
    res.json(contact[0]); // Enviamos el contacto encontrado
  } catch (error) {
    console.error("Error obteniendo contacto:", error);
    res.status(500).json({ error: "Error obteniendo contacto" }); // Enviamos un mensaje de error al cliente
  }
};

// Crear un nuevo contacto
export const createContact = async (req, res) => {
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const {
      NIT,
      protocol,
      full_name,
      position,
      email,
      phone,
      mobile,
      address,
      city
    } = req.body; // Obtenemos los datos del contacto
    const sql = `
      INSERT INTO contacts (
        NIT, protocol, full_name, position, email, phone, mobile, address, city
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `; // Insertamos en la tabla contacts
    const result = await connection.query(sql, [
      NIT, protocol, full_name, position, email, phone, mobile, address, city
    ]); // Ejecutamos la consulta
    res.json({ message: "Contacto creado", id: result.insertId }); // Enviamos el ID del contacto creado
  } catch (error) {
    console.error("Error creando contacto:", error);
    res.status(500).json({ error: "Error creando contacto" }); // Enviamos un mensaje de error al cliente
  }
};

// Actualizar un contacto
export const updateContact = async (req, res) => {
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const { id } = req.params; // Obtenemos el ID del contacto
    const {
      NIT,
      protocol,
      full_name,
      position,
      email,
      phone,
      mobile,
      address,
      city
    } = req.body; // Obtenemos los datos del contacto
    const sql = `
      UPDATE contacts SET
        NIT = ?, protocol = ?, full_name = ?, position = ?, email = ?,
        phone = ?, mobile = ?, address = ?, city = ?
      WHERE id = ?
    `; // Actualizamos el contacto
    const result = await connection.query(sql, [
      NIT, protocol, full_name, position, email, phone, mobile, address, city, id
    ]); // Ejecutamos la consulta
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }
    res.json({ message: "Contacto actualizado" }); // Confirmamos la actualización
  } catch (error) {
    console.error("Error actualizando contacto:", error);
    res.status(500).json({ error: "Error actualizando contacto" }); // Enviamos un mensaje de error al cliente
  }
};

// Eliminar un contacto
export const deleteContact = async (req, res) => {
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const { id } = req.params; // Obtenemos el ID del contacto
    const sql = `DELETE FROM contacts WHERE id = ?`; // Eliminamos el contacto
    const result = await connection.query(sql, [id]); // Ejecutamos la consulta
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }
    res.json({ message: "Contacto eliminado" }); // Confirmamos la eliminación
  } catch (error) {
    console.error("Error eliminando contacto:", error);
    res.status(500).json({ error: "Error eliminando contacto" }); // Enviamos un mensaje de error al cliente
  }
};
