import { getConnection } from "../database/connection.js";

// Obtener todas las empresas
export const getCompanies = async (req, res) => {
  let connection;
  try {
    connection = await getConnection(); // Obtenemos una conexión del pool
    const sql = "SELECT * FROM companies"; // Consultamos la tabla companies
    const [companies] = await connection.query(sql); // Obtenemos los datos de la consulta
    res.json(companies); // Enviamos los datos a la respuesta
  } catch (error) {
    console.error("Error obteniendo empresas:", error);
    res.status(500).json({ error: "Error obteniendo empresas" });
  } finally {
    if (connection) connection.release(); // Liberamos la conexión al pool
  }
};

// Obtener una empresa por NIT
export const getCompanyByNIT = async (req, res) => {
  const { nit } = req.params; // Obtenemos el NIT de la empresa
  let connection;
  try {
    connection = await getConnection(); // Obtenemos una conexión del pool
    const sql = `SELECT * FROM companies WHERE NIT = ?`; // Consultamos la tabla companies
    const [company] = await connection.query(sql, [nit]); // Obtenemos los datos de la consulta
    if (company.length === 0) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }
    res.json(company[0]); // Enviamos la empresa encontrada
  } catch (error) {
    console.error("Error obteniendo empresa:", error);
    res.status(500).json({ error: "Error obteniendo empresa" });
  } finally {
    if (connection) connection.release(); // Liberamos la conexión al pool
  }
};


// Crear una nueva empresa
// Crear una nueva empresa
export const createCompany = async (req, res) => {
  let connection;
  try {
    connection = await getConnection(); // Obtenemos una conexión del pool

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
    } = req.body;

    // Asegúrate de que las fechas estén en el formato correcto
    const formattedAffiliationDate = affiliation_date ? new Date(affiliation_date).toISOString().split('T')[0] : null;
    const formattedDisaffiliationDate = disaffiliation_date ? new Date(disaffiliation_date).toISOString().split('T')[0] : null;

    const sql = `
        INSERT INTO companies (
          NIT, company_name, acronym, affiliation_status, affiliation_date,
          disaffiliation_date, industry_sector, is_producer, primary_activity,
          secondary_activity, other_activity_1, other_activity_2, business_nature,
          institutional_email, website, city, address_type, address, phone, mobile
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Ejecutamos la consulta
    const result = await connection.query(sql, [
      NIT,
      company_name,
      acronym,
      affiliation_status,
      formattedAffiliationDate,
      formattedDisaffiliationDate,
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
    ]);

    res.status(201).json({ id: result.insertId, message: "Empresa creada exitosamente" });
  } catch (error) {
    console.error("Error creando empresa:", error);
    res.status(500).json({ error: "Error creando empresa" });
  } finally {
    if (connection) connection.release(); // Liberamos la conexión al pool
  }
};



// Actualizar una empresa
// Actualizar una empresa
export const updateCompany = async (req, res) => {
  let connection;
  try {
    connection = await getConnection(); // Obtenemos una conexión del pool
    const { id } = req.params; // Obtenemos el ID de la empresa
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

    // Asegúrate de que las fechas estén en el formato correcto
    const formattedAffiliationDate = affiliation_date ? new Date(affiliation_date).toISOString().split('T')[0] : null;
    const formattedDisaffiliationDate = disaffiliation_date ? new Date(disaffiliation_date).toISOString().split('T')[0] : null;

    const sql = `
      UPDATE companies SET
        NIT = ?,
        company_name = ?, acronym = ?, affiliation_status = ?, affiliation_date = ?,
        disaffiliation_date = ?, industry_sector = ?, is_producer = ?, primary_activity = ?,
        secondary_activity = ?, other_activity_1 = ?, other_activity_2 = ?, business_nature = ?,
        institutional_email = ?, website = ?, city = ?, address_type = ?, address = ?, phone = ?, mobile = ?
      WHERE id = ?
    `; // Actualizamos la empresa

    const result = await connection.query(sql, [
      NIT, company_name, acronym, affiliation_status, formattedAffiliationDate,
      formattedDisaffiliationDate, industry_sector, is_producer, primary_activity,
      secondary_activity, other_activity_1, other_activity_2, business_nature,
      institutional_email, website, city, address_type, address, phone, mobile, id
    ]); // Ejecutamos la consulta

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }
    res.json({ message: "Empresa actualizada" });
  } catch (error) {
    console.error("Error actualizando empresa:", error);
    res.status(500).json({ error: "Error actualizando empresa" });
  } finally {
    if (connection) connection.release(); // Liberamos la conexión al pool
  }
};


// Eliminar una empresa
export const deleteCompany = async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.beginTransaction(); // Inicia una transacción

    const { id } = req.params;
    const sql = `DELETE FROM companies WHERE id = ?`;
    const [result] = await connection.query(sql, [id]);

    if (result.affectedRows === 0) {
      await connection.rollback(); // Revierte la transacción si no se encontró la empresa
      return res.status(404).json({ error: "Empresa no encontrada" });
    }

    await connection.commit(); // Confirma la transacción
    res.json({ message: "Empresa eliminada" });
  } catch (error) {
    if (connection) await connection.rollback(); // Si ocurre un error, revierte la transacción
    console.error("Error eliminando empresa:", error);
    res.status(500).json({ error: "Error eliminando empresa" });
  } finally {
    if (connection) connection.release();
  }
};



