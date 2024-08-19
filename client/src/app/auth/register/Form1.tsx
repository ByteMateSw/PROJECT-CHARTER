import InputField from "@/app/components/auth/register/InputField";
import { Field, User, HandleChange, OnClickFunction } from "./interfaces";
import GoogleOauth from "../googleOauth";

export default function Form1({
  fields,
  errorMessage,
  user,
  handleChange,
  onClickFunction,
}: {
  fields: Field[];
  errorMessage: string;
  user: User;
  handleChange: HandleChange;
  onClickFunction: OnClickFunction;
}) {
  return (
    <>
      <section className="flex flex-wrap w-full justify-center">
        {fields.map((field, index) => (
          <div key={index} className="my-4 w-full sm:w-1/2 sm:px-2">
            <label
              htmlFor={field.name}
              className="block mb-1 ml-4 font-bold text-xl"
            >
              {field.label}
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
      </section>

      <div className="w-full flex flex-col justify-center my-2">
        <div className="text-red-500 w-full flex justify-center mb-4">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <button
          id="submit"
          type="submit"
          className=" w-full h-12 bg-primary-blue rounded-3xl text-secondary-white text-xl mb-2 hover:scale-105 duration-150"
          onClick={onClickFunction}
        >
          Registrarse
        </button>
      </div>
      <div className="divider divider-horizontal">o</div>
      {/* <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID as string}> */}
        <GoogleOauth check={false}/>
      {/* </GoogleOAuthProvider> */}
    </>
  );
}
