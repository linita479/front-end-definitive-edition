import React, { useEffect, useState } from "react";

const ListaAcademicos = ({ nroDoc }) => {
    const [academicos, setAcademicos] = useState([]);
    const [academicoEditando, setAcademicoEditando] = useState(null);

    useEffect(() => {
        const obtenerAcademicos = async () => {
        try {
            const res = await fetch(`http://localhost:8000/academicos/?nro_doc=${nroDoc}`, {
            headers: {
                Authorization: "Token aed59313f50d73fd6942f0d22aee7b3ba24eca4b"
            }
            });
            const data = await res.json();
            console.log("Respuesta de académicos:", data);
            setAcademicos(data.academicos || []);
        } catch (error) {
            console.error("Error al cargar académicos:", error);
        }
        };

        if (nroDoc) {
        obtenerAcademicos();
        }
    }, [nroDoc]);

    return (
        <div>
        <h4>Formación Académica</h4>
        {academicos.length === 0 ? (
            <p>No se encontraron títulos registrados.</p>
        ) : (
            <ul>
            {academicos.map((a, idx) => (
                <li key={idx}>
                <p><strong>Titulo obtenido-</strong>{a.titulo_obtenido}</p>
                <p><strong>Institucion educativa-</strong>{a.institucion_educativa}</p>
                <p><strong>Fecha de inicio-</strong>{a.fecha_inicio}</p>
                <p><strong>Fecha de culminacion-</strong>{a.fecha_culminado}</p>
                <br />
                <button onClick={() => setAcademicoEditando(a)}>Actualizar</button>
                </li>
            ))}
            </ul>
        )}
        {academicoEditando && (
        <form
            onSubmit={async (e) => {
            e.preventDefault();
            try {
                const res = await fetch(`http://localhost:8000/academicos/${academicoEditando.id}/?nro_doc=${nroDoc}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Token TU_TOKEN_AQUI"
                },
                body: JSON.stringify({
                    titulo_obtenido: academicoEditando.titulo_obtenido,
                    institucion_educativa: academicoEditando.institucion_educativa
                })
                });
                const data = await res.json();
                console.log("Actualizado:", data);
                // Actualiza la lista si quieres o refresca
                setAcademicoEditando(null);
            } catch (error) {
                console.error("Error actualizando:", error);
            }
            }}
        >
            <input
            value={academicoEditando.titulo_obtenido}
            onChange={(e) =>
                setAcademicoEditando({ ...academicoEditando, titulo_obtenido: e.target.value })
            }
            />
            <input
            value={academicoEditando.institucion_educativa}
            onChange={(e) =>
                setAcademicoEditando({ ...academicoEditando, institucion_educativa: e.target.value })
            }
            />
            <button type="submit">Guardar cambios</button>
            <button type="button" onClick={() => setAcademicoEditando(null)}>Cancelar</button>
        </form>
)}
        </div>
    );
    };

export default ListaAcademicos;