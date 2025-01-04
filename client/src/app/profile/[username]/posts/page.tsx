'use client'
import React, {useEffect, useState} from "react";
import { useUser } from "../../../../context/userContext";
import { getPostsByUserName } from '../../../api/post/index'
import NanoClamp from "nanoclamp";
import { dateDifference } from '../../../../utils/functions'
import ApplicantsModal from "../../../components/Dashboard/ApplicantsModal";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

export default function Page({ params }: { params: { username: string } }) {

    const [user, setUser] = useUser();
    const { data: session, status }: any = useSession();
    const [isMyProfile, setIsMyProfile] = useState<boolean>(true)


    let decoded: any;
    if (typeof session?.user?.access_token === "string") {
      decoded = jwtDecode(session?.user?.access_token);
    }

    useEffect(() => {
      if (decoded != undefined) {
        if (decoded?.user.email === user?.email) {
          setIsMyProfile(true)
          return
        }
        setIsMyProfile(false)
      } else {
        if (session?.user?.email === user?.email) {
          setIsMyProfile(true)
          return
        }

        setIsMyProfile(false)
      }
    },[user])


    return (
        <section className=" justify-center items-start p-4 md:h-full min-h-72 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
        {user?.posts.length > 0 ?
        <>
        {user?.posts.map((post: any, index: number) => {
        const date = dateDifference(post.creationDate)
        return (
          <div className="flex flex-col justify-around shadow-md p-4 rounded-xl" key={index}>
            <span className="flex md:justify-between min-[1620px]:items-center items-start flex-col-reverse min-[1620px]:flex-row">
              <h2 className="flex-start text-lg text-primary-blue font-bold">
                {post.title}
              </h2>
              <h6 className="flex-end text-xs text-secondary-gray">
                {`Publicado hace ${date.time} ${date.unit}`}
              </h6>
            </span>
            <h4 className="text-sm mb-2 text-secondary-gray">{`${post.user.firstName} ${post.user.lastName}`}</h4>
            <NanoClamp
              className="text-secondary-gray"
              is="p"
              lines={3}
              text={post.description}
            />
            <div className="mt-2">
              {post.price}
            </div>
            <div className="flex items-start flex-col min-[1150px]:justify-between min-[1150px]:items-center min-[1150px]:flex-row mt-4">

              <div className="flex cursor-default select-none">
                <span className="ml-1 text-secondary-gray text-xs font-bold">
                  Ubicación
                </span>
              </div>
              {/* <Link className="btn btn-primary rounded-full h-8" href="/">
                Ver detalles
              </Link> */}
              {/* <JobsModal post={post} index={index}/> */}
              <ApplicantsModal index={index} applicants={post.subscribers} sameUser={isMyProfile}/>
            </div>
          </div>
        );
      })}
        
        </>
        :
        <h2>Aun no has creado ningun post</h2>
        }
        </section >
    )
}