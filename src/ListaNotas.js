import React, { useEffect, useState, useRef } from "react";
import { v4 as uuid } from 'uuid';
import ItemNota from "./ItemNota";

function ListaNotas() {

    // guardar notas/errores y establecer referencias 
    const [notas, setNotas] = useState([]);
    const notaRef = useRef();
    const tituloRef = useRef();
    const importanteRef = useRef();
    const [error, setError] = useState('');

    // llave para localstorage
    const KEY = 'notas-evaluacion-cuatro';

    // cargar notas
    useEffect(() => {
        const misNotas = JSON.parse(localStorage.getItem(KEY));
        if (misNotas) {
            setNotas(misNotas);
        }
    }, []);

    //guardar notas
    useEffect(() => {
        const json = JSON.stringify(notas);
        localStorage.setItem(KEY, json);
    }, [notas]);

    //agregar notas
    const agregarNota = () => {
        const nota = notaRef.current.value.trim();
        const titulo = tituloRef.current.value.trim();
        const importante = importanteRef.current.checked;

        // Validar descripcion que no este vacia
        if (nota === '') {
            setError('La descripción es obligatoria.');
            return;
        }

        // Limpiar el mensaje de error si la validacion es correcta
        setError('');

        // Generar un ángulo de rotación de nota
        const rotation = Math.floor(Math.random() * 31) - 15;

        setNotas((prev) => {
            const nuevaNota = {
                id: uuid(),
                nota: nota,
                titulo: titulo,
                color: importante ? 'red' : 'yellow',
                importante: importante,
                rotation: rotation // Añade rotación a la nueva nota
            }
            return [...prev, nuevaNota];
        });

        // Limpiar campos de ingreso después de agregar nota
        notaRef.current.value = '';
        tituloRef.current.value = '';
        importanteRef.current.checked = false;
    }

    return (
        <>
        <h1><b>Simulador de notas</b></h1>
        <div className="my-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-3">
                    <input ref={tituloRef} className="form-control" placeholder="Título"></input>
                </div>
                <div className="col-md-4 col-12 mb-3">
                    <input ref={notaRef} className="form-control" placeholder="Descripción" required></input>
                </div>
                <div className="col-md-2 col-6 mb-3">
                    <div className="form-check">
                        <input ref={importanteRef} id="importante_caja" className="form-check-input" type="checkbox"></input>
                        <label htmlFor="importante_caja" className="form-check-label; importante_color">Importante!</label>
                    </div>
                </div>
                <div className="col-md-1 col-6 mb-3 d-flex justify-content-center">
                    <button onClick={agregarNota} className="btn btn-dark">AGREGAR</button>
                </div>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
        <div className="mx-5">
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {notas.map((t) => (
                    <div className="col" key={t.id}>
                        <ItemNota 
                            nota={t.nota} 
                            titulo={t.titulo} 
                            importante={t.importante} 
                            rotation={t.rotation}
                        />
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default ListaNotas;
