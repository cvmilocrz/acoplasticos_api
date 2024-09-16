import { getConnection } from "../database/connection.js";

// Obtener todas las empresas
export const getCompanies = async (req, res) => {
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const sql = "SELECT * FROM companies"; // Consultamos la tabla companies
    const [companies] = await connection.query(sql); // Obtenemos los datos de la consulta
    res.json(companies); // Enviamos los datos a la respuesta
  } catch (error) {
    console.error("Error obteniendo empresas:", error);
    res.status(500).json({ error: "Error obteniendo empresas" }); // Enviamos un mensaje de error al cliente
  }
};

// Obtener una empresa por NIT
export const getCompanyByNIT = async (req, res) => {
  const { nit } = req.params; // Obtenemos el NIT de la empresa
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const sql = `SELECT * FROM companies WHERE NIT = ?`; // Consultamos la tabla companies
    const [company] = await connection.query(sql, [nit]); // Obtenemos los datos de la consulta
    if (company.length === 0) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }
    res.json(company[0]); // Enviamos la empresa encontrada
  } catch (error) {
    console.error("Error obteniendo empresa:", error);
    res.status(500).json({ error: "Error obteniendo empresa" }); // Enviamos un mensaje de error al cliente
  }
};

// Crear una nueva empresa
export const createCompany = async (req, res) => {
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const {
      NIT,
      company_name,
      acronym,
      affiliation_status,
      affiliation_date,
      disaffiliation_date,
      industry_sector,
      is_producer,
      primary_activity,
      secondary_activity,
      other_activity_1,
      other_activity_2,
      business_nature,
      institutional_email,
      website,
      city,
      address_type,
      address,
      phone,
      mobile
    } = req.body; // Obtenemos los datos de la empresa
    const sql = `
      INSERT INTO companies (
        NIT, company_name, acronym, affiliation_status, affiliation_date,
        disaffiliation_date, industry_sector, is_producer, primary_activity,
        secondary_activity, other_activity_1, other_activity_2, business_nature,
        institutional_email, website, city, address_type, address, phone, mobile
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `; // Insertamos en la tabla companies
    const result = await connection.query(sql, [
      NIT, company_name, acronym, affiliation_status, affiliation_date,
      disaffiliation_date, industry_sector, is_producer, primary_activity,
      secondary_activity, other_activity_1, other_activity_2, business_nature,
      institutional_email, website, city, address_type, address, phone, mobile
    ]); // Ejecutamos la consulta
    res.json({ message: "Empresa creada", NIT: result.insertId }); // Enviamos el NIT de la empresa creada
  } catch (error) {
    console.error("Error creando empresa:", error);
    res.status(500).json({ error: "Error creando empresa" }); // Enviamos un mensaje de error al cliente
  }
};

// Actualizar una empresa
export const updateCompany = async (req, res) => {
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const { nit } = req.params; // Obtenemos el NIT de la empresa
    const {
      company_name,
      acronym,
      affiliation_status,
      affiliation_date,
      disaffiliation_date,
      industry_sector,
      is_producer,
      primary_activity,
      secondary_activity,
      other_activity_1,
      other_activity_2,
      business_nature,
      institutional_email,
      website,
      city,
      address_type,
      address,
      phone,
      mobile
    } = req.body; // Obtenemos los datos de la empresa
    const sql = `
      UPDATE companies SET
        company_name = ?, acronym = ?, affiliation_status = ?, affiliation_date = ?,
        disaffiliation_date = ?, industry_sector = ?, is_producer = ?, primary_activity = ?,
        secondary_activity = ?, other_activity_1 = ?, other_activity_2 = ?, business_nature = ?,
        institutional_email = ?, website = ?, city = ?, address_type = ?, address = ?, phone = ?, mobile = ?
      WHERE NIT = ?
    `; // Actualizamos la empresa
    const result = await connection.query(sql, [
      company_name, acronym, affiliation_status, affiliation_date,
      disaffiliation_date, industry_sector, is_producer, primary_activity,
      secondary_activity, other_activity_1, other_activity_2, business_nature,
      institutional_email, website, city, address_type, address, phone, mobile, nit
    ]); // Ejecutamos la consulta
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }
    res.json({ message: "Empresa actualizada" }); // Confirmamos la actualización
  } catch (error) {
    console.error("Error actualizando empresa:", error);
    res.status(500).json({ error: "Error actualizando empresa" }); // Enviamos un mensaje de error al cliente
  }
};

// Eliminar una empresa
export const deleteCompany = async (req, res) => {
  try {
    const connection = await getConnection(); // Obtenemos una conexión a la base de datos
    const { nit } = req.params; // Obtenemos el NIT de la empresa
    const sql = `DELETE FROM companies WHERE NIT = ?`; // Eliminamos la empresa
    const result = await connection.query(sql, [nit]); // Ejecutamos la consulta
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }
    res.json({ message: "Empresa eliminada" }); // Confirmamos la eliminación
  } catch (error) {
    console.error("Error eliminando empresa:", error);
    res.status(500).json({ error: "Error eliminando empresa" }); // Enviamos un mensaje de error al cliente
  }
};
