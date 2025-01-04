export default function Sidebar() {
    return (
        <ul className="flex flex-col gap-9">
            <li><a className="cursor-pointer" href="#image">Imagen de perfil y portada</a></li>
            <li><a className="cursor-pointer" href="#about">Información básica</a></li>
            <li><a className="cursor-pointer" href="#social">Redes de contacto</a></li>
        </ul>
    )
}