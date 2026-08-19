/**
 * @file CrearSolicitud.jsx
 * @module Solicitudes
 * @description Módulo para crear solicitudes de ingreso de proveedores en el sistema SGIPEC.
 * @author Heydi Estupiñan Estupiñán — SENA ADSO Ficha 3186650
 */

import React, { useState, useEffect } from 'react';

const CrearSolicitud = () => {
    const [proveedores, setProveedores] = useState([]);
    const [proveedorId, setProveedorId] = useState('');
    const [motivo, setMotivo] = useState('');
    const [mensaje, setMensaje] = useState('');

    // Carga la lista de proveedores al montar el componente,
    // para que el usuario elija uno en vez de escribir el ID a mano.
    useEffect(() => {
        const cargarProveedores = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/proveedores');
                const data = await response.json();
                setProveedores(data);
            } catch (error) {
                console.error('No se pudo cargar la lista de proveedores:', error);
            }
        };
        cargarProveedores();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        try {
            const response = await fetch('http://localhost:8080/api/solicitudes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    proveedorId: Number(proveedorId),
                    motivo,
                }),
            });

            if (response.status === 409) {
                const texto = await response.text();
                setMensaje(`No se pudo crear la solicitud: ${texto}`);
                return;
            }

            const data = await response.json();
            setMensaje(`Solicitud creada (ID: ${data.id}, Estado: ${data.estado})`);
            setMotivo('');
            setProveedorId('');
        } catch (error) {
            setMensaje('Error al crear la solicitud. Verifica que el backend esté corriendo.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="proveedorId">Proveedor:</label>
            <select
                id="proveedorId"
                name="proveedorId"
                value={proveedorId}
                onChange={(e) => setProveedorId(e.target.value)}
                required
            >
                <option value="">-- Selecciona un proveedor --</option>
                {proveedores.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.nombre} ({p.estado})
                    </option>
                ))}
            </select>

            <label htmlFor="motivo">Motivo del ingreso:</label>
            <textarea
                id="motivo"
                name="motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                required
            />

            <button type="submit">Crear Solicitud</button>
            {mensaje && <p>{mensaje}</p>}
        </form>
    );
};

export default CrearSolicitud;