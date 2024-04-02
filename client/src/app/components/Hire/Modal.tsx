export default function Modal() {
    return (
        <>
            <div className="bg-secondary-black h-36 w-[487px] rounded-3xl" />
            <div className="flex justify-center items-center -ml-14">
                <img
                    className="h-40 w-h-40 rounded-full border-2 -mt-20 aspect-square"
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                />
                <div className="h-6 w-6 relative bg-secondary-white rounded-full -mt-[270px] -ml-16"></div>
            </div>
            <div className="mx-auto my-4 w-56">
                <h3 className="text-bold text-xl font-black text-gray-800">
                    Joaquín Ezequiel Ortiz
                </h3>
                <p className="text-sm text-secondary-gray w-full">
                    Desarrollador Web
                </p>
                <p>Lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet</p>
            </div>
            <div className="flex mx-auto gap-4">
                <button className="btn">Button a</button>
                <button className="btn">Button a</button>
                <button className="btn">Button a</button>
            </div>
            <hr className="border-t border-secondary-gray mt-8" />
            <div className="ml-8 flex flex-col flex-1 my-3">
                <label className="flex flex-start flex-1">Lorem ipsum</label>
                <ul className="flex gap-2">
                    <li className="h-10 w-10 rounded-lg bg-secondary-gray">.</li>
                    <li className="h-10 w-10 rounded-lg bg-secondary-gray">.</li>
                    <li className="h-10 w-10 rounded-lg bg-secondary-gray">.</li>
                    <li className="h-10 w-10 rounded-lg bg-secondary-gray">.</li>
                </ul>
            </div>
            <hr className="border-t border-secondary-gray" />
            <p className="text-start ml-8 my-5">Lorem ipsum</p>
        </>
    )
}