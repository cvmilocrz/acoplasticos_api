import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controller/users.controller.js';

const router = Router();

// Definición de rutas bajo el prefijo /api/users en el archivo principal del servidor
router.get('/', getUsers); // GET /api/users
router.get('/:id', getUserById); // GET /api/users/:id
router.post('/', createUser); // POST /api/users
router.put('/:id', updateUser); // PUT /api/users/:id
router.delete('/:id', deleteUser); // DELETE /api/users/:id

export default router;
