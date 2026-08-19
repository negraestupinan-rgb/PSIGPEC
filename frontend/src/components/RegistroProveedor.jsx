/**
 * @file RegistroProveedor.jsx
 * @module Proveedores
 * @description Módulo para el registro de nuevos proveedores en el sistema SGIPEC.
 * @author Heydi Estupiñan Estupiñán — SENA ADSO Ficha 3186650
 */

import React, { useState } from 'react';

const RegistroProveedor = () => {
    const [proveedor, setProveedor] = useState({
        nombre: '',
        documento: '',
        correo: '',
        telefono: ''
    });
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProveedor(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/proveedores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(proveedor),
            });
            const data = await response.json();
            setMensaje(`Proveedor registrado: ${data.nombre} (ID: ${data.id}, Estado: ${data.estado})`);
            setProveedor({ nombre: '', documento: '', correo: '', telefono: '' });
        } catch (error) {
            setMensaje('Error al registrar el proveedor. Verifica que el backend esté corriendo.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre del Proveedor:</label>
            <input type="text" id="nombre" name="nombre" value={proveedor.nombre} onChange={handleChange} required />

            <label htmlFor="documento">Documento (Cédula o NIT):</label>
            <input type="text" id="documento" name="documento" value={proveedor.documento} onChange={handleChange} required />

            <label htmlFor="correo">Correo:</label>
            <input type="email" id="correo" name="correo" value={proveedor.correo} onChange={handleChange} />

            <label htmlFor="telefono">Teléfono:</label>
            <input type="text" id="telefono" name="telefono" value={proveedor.telefono} onChange={handleChange} />

            <button type="submit">Registrar Proveedor</button>
            {mensaje && <p>{mensaje}</p>}
        </form>
    );
};

export default RegistroProveedor;