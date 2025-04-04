import InputField1 from "../../components/Inputs/InputField1";

export default function SocialMedia({ redes, user, socialNet, handleChange }: any) {
    
    return (
        <section id="social" className="flex flex-col gap-6 w-3/4 pb-8 pt-20">
            <h2 className="text-xl font-bold">Redes de Contacto</h2>
            <div>
                <label 
                    htmlFor="web"
                    className="flex flex-col items-start mb-1 ml-4 text-base"
                >
                    <span className="flex items-center justify-center">
                        <img src='/svg/web-site.svg' alt="Icon" className="h-6 w-6 mr-2 select-none" />
                        Web
                    </span>
                </label>
                <InputField1
                    id='web'
                    autoComplete='off'
                    type={"text"}
                    name='web'
                    placeholder={socialNet && (socialNet['web'] !== null ? socialNet['web'] : 'Link de website')}
                    value={user['web']}
                    iconSrc=""
                    onChange={handleChange}
                />
            </div>
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
                        placeholder={socialNet && (socialNet[name] !== null ? socialNet[name] : placeholder)}
                        value={user[name]}
                        iconSrc=""
                        onChange={handleChange}
                    />
                </div>
            ))}
        </section>
    )
}