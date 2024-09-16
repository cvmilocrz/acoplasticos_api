import { Router } from 'express';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} from '../controller/contacts.controller.js';

const router = Router();

// Definición de rutas bajo el prefijo /api/contacts en el archivo principal del servidor
router.get('/', getContacts); // GET /api/contacts
router.get('/:id', getContactById); // GET /api/contacts/:id
router.post('/', createContact); // POST /api/contacts
router.put('/:id', updateContact); // PUT /api/contacts/:id
router.delete('/:id', deleteContact); // DELETE /api/contacts/:id

export default router;
