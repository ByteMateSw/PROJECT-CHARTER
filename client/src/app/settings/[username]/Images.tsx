import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Images({ user, userData }: any) {
    const [profilePhoto, setProfilePhoto] = useState(userData?.photo || '/img/png.png');
    const [portadaPhoto, setPortadaPhoto] = useState(userData?.backgroundPhoto || '/img/png.png');
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

    useEffect(() => {
        setProfilePhoto(userData?.photo || '/img/png.png');
        setPortadaPhoto(userData?.backgroundPhoto || '/img/png.png');
    }, [userData]);

    const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setProfilePhoto(e.target.result as string);
                }
            };
            reader.readAsDataURL(event.target.files[0]);
            setProfileImageFile(event.target.files[0]);
        }
    };

    const handlePortadaPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setPortadaPhoto(e.target.result as string);
                }
            };
            reader.readAsDataURL(event.target.files[0]);
            setCoverImageFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        if (profileImageFile) {
            formData.append('profileImage', profileImageFile);
        }
        if (coverImageFile) {
            formData.append('coverImage', coverImageFile);
        }

        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userData.id}/images`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            //console.log('User updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <section id="image" className="flex gap-6 w-full pb-8 pt-20">
            <form onSubmit={handleSubmit} className="w-full">
                <span className="text-xl font-bold">Imagen de Perfil</span>
                <div className="flex">
                    <picture className="flex justify-center items-center w-72 h-32 px-24 py-5 rounded-3xl bg-secondary-gray/15 cursor-pointer">
                        <label htmlFor="uploadProfileImg">
                            <img
                                className="h-24 w-24 border-2 rounded-full border-secondary-white cursor-pointer"
                                src={profilePhoto}
                                alt="Imagen de Perfil"
                            />
                        </label>
                    </picture>
                    <label
                        className="ml-6 inline-flex items-center cursor-pointer"
                        htmlFor="uploadProfileImg"
                    >
                        <input
                            type="file"
                            id="uploadProfileImg"
                            className="hidden"
                            onChange={handleProfilePhotoChange}
                        />
                        Subir Imagen de Perfil
                    </label>
                </div>

                <span className="text-xl font-bold">Imagen de Portada</span>
                <div className="flex">
                    <picture className="flex justify-center items-center w-72 h-32 rounded-3xl bg-secondary-gray/15 cursor-pointer">
                        <label htmlFor="uploadPortadaImg" className="w-full h-full">
                            <img
                                className="w-full h-full object-cover border-2 rounded-3xl border-secondary-white cursor-pointer"
                                src={portadaPhoto}
                                alt="Imagen de Portada"
                            />
                        </label>
                    </picture>
                    <label
                        className="ml-6 inline-flex items-center cursor-pointer"
                        htmlFor="uploadPortadaImg"
                    >
                        <input
                            type="file"
                            id="uploadPortadaImg"
                            className="hidden"
                            onChange={handlePortadaPhotoChange}
                        />
                        Subir Imagen de Portada
                    </label>
                </div>

                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
                    Actualizar Imágenes
                </button>
            </form>
        </section>
    );
}