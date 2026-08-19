import React, { useState } from 'react';
import './App.css';
import logo from './img/logo1.png';
import FormularioLogin from './components/FormularioLogin';
import RegistroProveedor from './components/RegistroProveedor';
import CrearSolicitud from './components/CrearSolicitud';

const App = () => {
    // Controla qué sección se muestra. Por defecto, "inicio".
    const [seccionActiva, setSeccionActiva] = useState('inicio');

    const irA = (seccion) => (e) => {
        e.preventDefault();
        setSeccionActiva(seccion);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} alt="SGIPEC Logo" />
                <h1>Sistema de Gestión de Ingresos de Proveedores</h1>
            </header>

            <nav className="App-nav">
                <ul>
                    <li>
                        <a
                            href="#inicio"
                            className={seccionActiva === 'inicio' ? 'activo' : ''}
                            onClick={irA('inicio')}
                        >
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a
                            href="#perfil"
                            className={seccionActiva === 'perfil' ? 'activo' : ''}
                            onClick={irA('perfil')}
                        >
                            Iniciar Sesión
                        </a>
                    </li>
                    <li>
                        <a
                            href="#proveedores"
                            className={seccionActiva === 'proveedores' ? 'activo' : ''}
                            onClick={irA('proveedores')}
                        >
                            Proveedores
                        </a>
                    </li>
                    <li>
                        <a
                            href="#solicitudes"
                            className={seccionActiva === 'solicitudes' ? 'activo' : ''}
                            onClick={irA('solicitudes')}
                        >
                            Solicitudes
                        </a>
                    </li>
                    <li>
                        <a
                            href="#contacto"
                            className={seccionActiva === 'contacto' ? 'activo' : ''}
                            onClick={irA('contacto')}
                        >
                            Contacto
                        </a>
                    </li>
                </ul>
            </nav>

            <main>
                {seccionActiva === 'inicio' && (
                    <section>
                        <h2>Bienvenido al SGIPEC</h2>
                        <p>
                            El Sistema de Gestión de Ingresos de Proveedores en Establecimiento
                            Carcelario permite administrar de forma segura y trazable el registro
                            de proveedores externos y sus solicitudes de ingreso.
                        </p>
                        <p>
                            Usa el menú superior para iniciar sesión, registrar un proveedor o
                            crear una solicitud de ingreso.
                        </p>
                    </section>
                )}

                {seccionActiva === 'perfil' && (
                    <section>
                        <h2>Iniciar Sesión</h2>
                        <FormularioLogin />
                    </section>
                )}

                {seccionActiva === 'proveedores' && (
                    <section>
                        <h2>Registro de Proveedores</h2>
                        <RegistroProveedor />
                    </section>
                )}

                {seccionActiva === 'solicitudes' && (
                    <section>
                        <h2>Crear Solicitud de Ingreso</h2>
                        <CrearSolicitud />
                    </section>
                )}

                {seccionActiva === 'contacto' && (
                    <section>
                        <h2>Contacto</h2>
                        <p>Para soporte técnico o consultas sobre el sistema SGIPEC, contáctanos:</p>
                        <p>Correo: soporte@sgipec.gov.co</p>
                        <p>Desarrollado por CodeSight — Heydi Estupiñán Estupiñán, SENA ADSO Ficha 3186650</p>
                    </section>
                )}
            </main>

            <footer>
                <p>&copy; 2026 SGIPEC - Todos los derechos reservados</p>
            </footer>
        </div>
    );
};

export default App;
