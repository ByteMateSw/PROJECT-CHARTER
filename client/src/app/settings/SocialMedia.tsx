import InputField1 from "../components/Inputs/InputField1";

export default function SocialMedia({ redes, user, handleChange }: any) {
    return (
        <section className="flex flex-col gap-6 w-3/4 pb-8 pt-20">
            <h2 className="text-xl font-bold">Redes de Contacto</h2>
            {redes.map(({ name, iconSrc, label, autoComplete, type, placeholder }: any, index: any) => (
                <div key={index}>
                    <label
                        htmlFor={name}
                        className="flex flex-col items-start mb-1 ml-4 text-base"
                    >
                        <span className="flex items-center justify-center">
                            <img src={iconSrc} alt="Icon" className="h-6 w-6 mr-2 select-none" />
                            {label}
                        </span>
                    </label>
                    <InputField1
                        id={name}
                        autoComplete={autoComplete}
                        type={type || "text"}
                        name={name}
                        placeholder={placeholder}
                        value={user[name]}
                        iconSrc=""
                        onChange={handleChange}
                    />
                </div>
            ))}
        </section>
    )
}