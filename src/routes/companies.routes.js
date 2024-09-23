import { Router } from 'express';
import {
  getCompanies,
  getCompanyByNIT,
  createCompany,
  updateCompany,
  deleteCompany
} from '../controller/companies.controller.js';

const router = Router();

// Definición de rutas bajo el prefijo /api/companies en el archivo principal del servidor
router.get('/', getCompanies); // GET /api/companies
router.get('/:NIT', getCompanyByNIT); // GET /api/companies/:NIT
router.post('/', createCompany); // POST /api/companies
router.put('/:id', updateCompany); // PUT /api/companies/:NIT
router.delete('/:id', deleteCompany); // DELETE /api/companies/:NIT

export default router;
