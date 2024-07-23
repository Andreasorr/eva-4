import React, { useEffect, useState , useRef} from "react";
import { v4 as uuid } from 'uuid';
import ItemNota from "./ItemNota";

function ListaNotas() {

    const [notas, setNotas] = useState([]);
    const notaRef = useRef();
    const tituloRef = useRef();
    const importanteRef = useRef();

    //recuperar notas del localstorage
    const KEY = 'notas-evaluacion-cuatro';
    useEffect(()=>{
        const misNotas = JSON.parse(localStorage.getItem(KEY));
        if (misNotas){
            setNotas(misNotas);
        }
    },[]);

    //almacenar notas en localstorage
    useEffect(()=>{
        const json = JSON.stringify(notas);
        localStorage.setItem(KEY,json);
    },[notas]);

    //agregar una nota
    const agregarNota = () => {
        const nota = notaRef.current.value;
        const titulo = tituloRef.current.value;
        const importante = importanteRef.current.checked;

        if (nota === '') return;

        setNotas((prev) => {
            const nuevaNota = {
                id:uuid(),
                nota:nota,
                titulo:titulo,
                color: importante ? 'red' : 'yellow',
                importante: importante
            }
            return [...prev,nuevaNota];
        })
    }

    return(
        <>
        <h1><b>Simulador de notas</b></h1>
        <div className="my-4">
            <div className="row">
                <div className="col-3">
                    <input ref={tituloRef} className="form-control" placeholder="Titulo"></input>
                </div>
                <div className="col-5">
                    <input ref={notaRef} className="form-control" placeholder="Descripcion - este campo es obligatorio" required></input>
                </div>
                <div className="col-2">
                    <div className="form-check">
                        <input ref={importanteRef} id="importante_caja" className="form-check-input" type="checkbox"></input>
                        <label htmlFor="importante_caja" className="form-check-label">Importante!</label>
                    </div>
                </div>
                <div className="d-grid col-2">
                    <button onClick={agregarNota} className="btn btn-dark">AGREGAR</button>
                </div>
            </div>
        </div>
        <div className="mx-5">
            <div className="row">
                {notas.map((t) => (
                    <ItemNota key={t.id} nota={t.nota} titulo={t.titulo} importante={t.importante}></ItemNota>
                ))}
            </div>
        </div>
        </>
    );
}

export default ListaNotas;