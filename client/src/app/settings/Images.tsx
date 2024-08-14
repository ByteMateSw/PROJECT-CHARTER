export default function Images({ user }: any) {
    return (
        <section className="flex gap-6 w-full pb-8 pt-20">
            <div className="w-full">
                <span className="text-xl font-bold">Imagen de Perfil</span>
                <div className="flex">
                    <picture className="flex justify-center items-center w-72 h-32 px-24 py-5 rounded-3xl bg-secondary-gray/15 cursor-pointer">
                        <label htmlFor="uploadProfileImg">
                            {user.photo ? (
                                <img
                                    className="h-24 w-24 border-2 rounded-full border-secondary-white cursor-pointer"
                                    src={user.photo}
                                    alt="Imagen de Perfil"
                                />
                            ) : (
                                <img
                                    className="h-24 w-24 border-2 rounded-full border-secondary-white cursor-pointer"
                                    src="/img/png.png"
                                    alt="Imagen de Perfil"
                                />
                            )}
                        </label>
                    </picture>
                    <label
                        className="ml-6 inline-flex items-center cursor-pointer"
                        htmlFor="uploadProfileImg"
                    >
                        <img
                            className="h-6 w-6 mr-2"
                            src="/svg/upload.svg"
                            alt="Cargar Archivo"
                        />
                        <span className="text-sm">Cargar imagen</span>
                        <input
                            className="hidden"
                            type="file"
                            name="uploadProfileImg"
                            id="uploadProfileImg"
                            placeholder=""
                        />
                    </label>
                </div>
            </div>
            <div className="w-full">
                <span className="text-xl font-bold">Imagen de Portada</span>
                <div className="flex">
                    <picture className="flex justify-center items-center w-72 h-32 px-24 py-5 rounded-3xl bg-secondary-gray/15 cursor-pointer">
                        <label htmlFor="uploadPortadaImg">
                            {user.photo ? (
                                <img
                                    className="h-24 w-60 border-2 rounded-full border-secondary-white cursor-pointer"
                                    src={user.photo}
                                    alt="Imagen de Portada"
                                />
                            ) : (
                                <img
                                    className="h-24 w-60 border-2 rounded-full border-secondary-white cursor-pointer"
                                    src="/img/png.png"
                                    alt="Imagen de Portada"
                                />
                            )}
                        </label>
                    </picture>
                    <label
                        className="ml-6 inline-flex items-center cursor-pointer"
                        htmlFor="uploadPortadaImg"
                    >
                        <img
                            className="h-6 w-6 mr-2"
                            src="/svg/upload.svg"
                            alt="Cargar Archivo"
                        />
                        <span className="text-sm">Cargar imagen</span>
                        <input
                            className="hidden"
                            type="file"
                            name="uploadPortadaImg"
                            id="uploadPortadaImg"
                            placeholder=""
                        />
                    </label>
                </div>
            </div>
        </section>
    )
}