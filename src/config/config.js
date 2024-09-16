import { config } from 'dotenv';
config();

export const PORT = parseInt(process.env.PORT) || process.argv[2] || 8080;

export const dbSettings = {
    host: process.env.HOST || '',
    user: process.env.USER || '',
    password: process.env.PASSWORD || '',
    database: process.env.DB || '',
    waitForConnections: true,
  };
  

export const API_KEY = process.env.API_KEY || '';

export const routes = {
    users: '/api/users',
    companies: '/api/companies',
    contacts: '/api/contacts',
}