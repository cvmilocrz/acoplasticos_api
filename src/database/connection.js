import mysql from 'mysql2/promise'; // Usando mysql2 con soporte para promesas
import { dbSettings } from '../config/config.js';

// Crear el pool de conexiones con la configuración de la base de datos
const pool = mysql.createPool(dbSettings);

// Función para obtener una conexión del pool
export const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    //console.log('Conectado a la base de datos');
    return connection;
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    throw error;
  }
};
