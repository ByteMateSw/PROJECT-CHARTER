import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { getExperienceByUserId } from "@/app/api/experience";
import InputField from "../../components/auth/register/InputField";
import ComboBox from "../../components/ComboBox";
import UpdateExpModal from "./UpdateExpModal";
import DeleteModel from "./DeleteModal";
import { officesData } from "@/data/offices";

export default function About({
  fields,
  userData,
  comboBoxOptions,
  styleComboBox,
  province,
  setProvince,
  city,
  setCity,
  user,
  offices,
  handleChangeOffices,
  handleRemoveOffice,
  handleChange,
  handleSaveExperience,
  handleDeleteExperience,
  handleToggleIsWorker,
}: any) {
  const [experiences, setExperiences] = useState(
    user.experience || [{ position: "", description: "", startDate: "", endDate: "", company: "" }]
  );
  const [exp, setExp] = useState([])
  

  //console.log(user)
  const handleChangeExperience = (index: any, e: any) => {
    const { name, value } = e.target;
    const newExperiences: any = [...experiences];
    newExperiences[index][name] = value;
    setExperiences(newExperiences);
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      { position: "", description: "", startDate: "", endDate: "", company: "" },
    ]);
  };

  const handleDeleteExperienceLocal = (index: any) => {
    const newExperiences = experiences.filter((_: any, i: any) => i !== index);
    setExperiences(newExperiences);
    handleDeleteExperience(experiences[index].id);
  };

  const handleSaveExperienceLocal = (index: any) => {
    handleSaveExperience(experiences[index]);
  };

  const springs = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  useEffect(() => {
    const getExperiences = async () => {
      try {
        if (userData.id != undefined) {
          const id: number = userData.id
          const response = await getExperienceByUserId(id)
          setExp(response?.data.sort((a: any, b: any): number => {
            const fechaA: Date = typeof a.startDate === 'string' ? new Date(a.startDate) : a.startDate;
            const fechaB: Date = typeof b.startDate === 'string' ? new Date(b.startDate) : b.startDate;
            return fechaA.getTime() - fechaB.getTime();
          }))
        }
      } catch (error) {
        console.error(error)
      }
  }
  getExperiences()
  },[userData])


  return (
    <>
      <section id="about" className="flex flex-col gap-6 w-3/4 pb-8 pt-20">
        <h2 className="text-xl font-bold">Información básica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field: any, index: any) => (
            <div key={index}>
              <label htmlFor={field.name} className="block mb-1 ml-4 font-bold text-xl">
                {field.label}
                {userData ? (
                  userData[field.name] && (
                    <em className="text-secondary-gray text-base">: {
                      userData[field.name] === '+100000000000' ? "Agregar numero de telefono" : userData[field.name]
                      }</em>
                  )
                ) : (
                  ""
                )}
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
        <div className="flex flex-wrap w-full">
          <div className="w-full md:w-1/2 md:pr-2">
            <span className="block mb-1 ml-4 font-bold text-xl">Provincia</span>
            <ComboBox
              optionsProps={comboBoxOptions.provinces}
              styles={styleComboBox}
              placeholder="Provincia"
              selectedOptions={province}
              setSelectedOptions={setProvince}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-2">
            <span className="block mb-1 ml-4 font-bold text-xl">Ciudad</span>
            <ComboBox
              optionsProps={comboBoxOptions.cities}
              styles={styleComboBox}
              placeholder="Ciudad"
              selectedOptions={city}
              setSelectedOptions={setCity}
            />
          </div>
        </div>
        <div>
          <div className="w-1/2">
            <span className="block mb-1 ml-4 font-bold text-xl">Profesiones</span>
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
              {user.offices.map((office: any) => {
                return (
                  <span
                    className="border text-xs text-secondary-gray rounded-full px-2 py-1 cursor-pointer"
                    key={office.id}
                    onClick={() => handleRemoveOffice(office.id)}
                  >
                    {office.name} X
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="isWorker"
            checked={user.isWorker}
            onChange={handleToggleIsWorker}
            className="mr-2"
          />
          <label htmlFor="isWorker" className="font-bold text-xl">
            ¿Es trabajador?
          </label>
        </div>
      </section>
      <section className="flex flex-col gap-6 w-3/4">
        <h2 className="text-xl font-bold">Acerca de Mí</h2>
        <span className="w-full h-48 flex border border-secondary-gray rounded-3xl p-3 bg-secondary-white">
          <textarea
            className="w-full h-full focus:outline-none bg-transparent resize-none"
            autoComplete="off"
            onChange={handleChange}
            name="about"
            placeholder="Descripción"
          />
        </span>
        <h2 className="text-xl font-bold">Habilidades y Conocimiento</h2>
        <span className="w-full h-48 flex border border-secondary-gray rounded-3xl p-3 bg-secondary-white">
          <textarea
            className="w-full h-full focus:outline-none bg-transparent resize-none"
            autoComplete="off"
            onChange={handleChange}
            name="habilities"
            placeholder="Descripción"
          />
        </span>
        <h2 className="text-xl font-bold">Experiencia Laboral</h2>
        {exp?.map(({id, company, title, endDate, startDate}:{id:number, company: string, title: string, endDate: string, startDate: string}) => {
          const inicio = new Date(startDate)
          const final = new Date(endDate)
          return (
          <div className="grid grid-cols-2 my-1" key={company}>
            <div className="my-1">
            <h3 className="text-base font-semibold">{title}</h3>
            <span className="text-sm font-normal text-secondary-gray">{company}</span>
            <div className="flex flex-col">
              <span className="text-sm font-normal">Inicio: {
                <span className="text-sm font-normal text-secondary-gray">{
                  inicio.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })
                  }</span>
                }
              </span>
              <span className="text-sm font-normal">Hasta: {
                <span className="text-sm font-normal text-secondary-gray">{
                  final.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })
                  }</span>
              }
              </span>
            </div>
            </div>
            <div className="flex items-center p-2 gap-2">
              <UpdateExpModal id={id} userId={userData.id}/>
              <DeleteModel id={id}/>
            </div>
          </div>
          )
        })}
        {experiences.map((experience: any, index: number) => (
          <animated.div key={index} style={springs} className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <label htmlFor={`position-${index}`} className="font-bold">
                Puesto:
              </label>
              <input
                type="text"
                name="position"
                id={`position-${index}`}
                value={experience.position}
                onChange={(e) => handleChangeExperience(index, e)}
                className="border rounded p-2"
              />
            </div>
              <div className="flex flex-col gap-2">
              <label htmlFor={`description-${index}`} className="font-bold">
                Description:
              </label>
              <input
                type="text"
                name="description"
                id={`description-${index}`}
                value={experience.description}
                onChange={(e) => handleChangeExperience(index, e)}
                className="border rounded p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`startDate-${index}`} className="font-bold">
                Fecha de inicio:
              </label>
              <input
                type="date"
                name="startDate"
                id={`startDate-${index}`}
                value={experience.startDate}
                onChange={(e) => handleChangeExperience(index, e)}
                className="border rounded p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`endDate-${index}`} className="font-bold">
                Fecha de fin o actual:
              </label>
              <input
                type="date"
                name="endDate"
                id={`endDate-${index}`}
                value={experience.endDate}
                onChange={(e) => handleChangeExperience(index, e)}
                className="border rounded p-2"
              />
            </div>
            {experience.startDate === "" || experience.endDate === "" ?
            <span></span>
            :
            new Date(experience.endDate).getTime() - new Date(experience.startDate).getTime() > 0 ?
            <span></span>
            :
            <span className="text-red-600 font-bold">
              La fecha de finalizacion no puede ser menor a la de inicio
            </span>
            }
            <div className="flex flex-col gap-2">
              <label htmlFor={`company-${index}`} className="font-bold">
                Empresa:
              </label>
              <input
                type="text"
                name="company"
                id={`company-${index}`}
                value={experience.company}
                onChange={(e) => handleChangeExperience(index, e)}
                className="border rounded p-2"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleSaveExperienceLocal(index)}
                className="bg-primary-blue text-white rounded p-2 mt-2"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => handleDeleteExperienceLocal(index)}
                className="bg-red-500 text-white rounded p-2 mt-2"
              >
                Eliminar
              </button>
            </div>
          </animated.div>
        ))}
        <button
          type="button"
          onClick={handleAddExperience}
          className="bg-primary-blue text-white rounded p-2 mt-2"
        >
          Añadir
        </button>
      </section>
    </>
  );
}