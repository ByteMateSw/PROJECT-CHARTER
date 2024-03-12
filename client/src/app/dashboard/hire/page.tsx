import { trabajadores } from "@/json/trabajadores";

export default function HirePage() {
    return(
        <>
        <main className="min-h-screen">
            <section className="flex">
                {trabajadores.map((trabajador)=>{
                    return(
                        <div key={trabajador.name}>
                            <img
                            src={trabajador.imageTrabajador}
                            alt={trabajador.name}
                            className="h-[220] w-[220px] rounded-full bg-secondary-gray" 
                            />
                            <h2>{trabajador.name}</h2>
                            <p>{trabajador.profesion}</p>
                            <p>{trabajador.ubicacion}</p>
                        </div>
                    );
                })}
                </section>
        </main>
        </>
    );
}
