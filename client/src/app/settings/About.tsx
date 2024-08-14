import InputField from "../components/auth/register/InputField";
import ComboBox from "../components/ComboBox";

export default function About({ fields, userData, comboBoxOptions, styleComboBox, province, setProvince, city, setCity, user, offices, handleChangeOffices, handleRemoveOffice, handleChange }: any) {
    return (
        <>
            <section className="flex flex-col gap-6 w-3/4 pb-8 pt-20">
                <h2 className="text-xl font-bold">Información básica</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields.map((field: any, index: any) => (
                        <div key={index}>
                            <label
                                htmlFor={field.name}
                                className="block mb-1 ml-4 font-bold text-xl"
                            >
                                {field.label}{userData ? userData[field.name] && <em className="text-secondary-gray text-base">: {userData[field.name]}</em> : ""}
                            </label>
                            <InputField
                                id={field.name}
                                autoComplete={field.autoComplete}
                                type={field.type || "text"}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={user[field.name]}
                                onChange={handleChange}
                                iconSrc={field.iconSrc}
                            />
                        </div>
                    ))}
                </div>
                {/* Campos de selección de provincia y ciudad */}
                <div className="flex flex-wrap w-full">
                    <div className="w-full md:w-1/2 md:pr-2">
                        <span className="block mb-1 ml-4 font-bold text-xl">
                            Provincia
                        </span>
                        <ComboBox
                            optionsProps={comboBoxOptions.provinces}
                            styles={styleComboBox}
                            placeholder="Provincia"
                            selectedOptions={province}
                            setSelectedOptions={setProvince}
                        />
                    </div>
                    <div className="w-full md:w-1/2 md:pl-2">
                        <span className="block mb-1 ml-4 font-bold text-xl">
                            Ciudad
                        </span>
                        <ComboBox
                            optionsProps={comboBoxOptions.cities}
                            styles={styleComboBox}
                            placeholder="Ciudad"
                            selectedOptions={city}
                            setSelectedOptions={setCity}
                        />
                    </div>
                </div>
                {/* Campos de selección de Profesiones */}
                <div>
                    <div className="w-1/2">
                        <span className="block mb-1 ml-4 font-bold text-xl">
                            Profesiones
                        </span>
                        <ComboBox
                            isMulti
                            optionsProps={comboBoxOptions.offices}
                            optionsToDisable={user.offices}
                            styles={styleComboBox}
                            placeholder="Profesiones"
                            selectedOptions={offices}
                            setSelectedOptions={handleChangeOffices}
                        />
                        <div className="flex gap-2 mt-2">
                            {/* {user.offices.map((office: any) => {
                                return (
                                    <span
                                        className="border text-xs text-secondary-gray rounded-full px-2 py-1 cursor-pointer"
                                        key={office.id}
                                        onClick={() => handleRemoveOffice(office.id)}
                                    >
                                        {office.name} X
                                    </span>
                                );
                            })} */}
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-6 w-3/4">
                <h2 className="text-xl font-bold">Acerca de Mí</h2>
                <span className="w-full h-48 flex border border-secondary-gray rounded-3xl p-3 bg-secondary-white">
                    <textarea
                        className="w-full h-full focus:outline-none bg-transparent resize-none"
                        autoComplete="off"
                        name="about"
                        placeholder="Descripción"
                    />
                </span>
            </section>
        </>
    )
}