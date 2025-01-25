'use client'
import { useEffect, useState } from "react";
import AddJobsModal from "./AddJobsModal";
import { getJobsByUser } from "@/app/api/jobs";
//import { getUserByEmail, getUserByUsername } from "@/app/api/user";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { useUser } from "@/context/userContext";

export default function Page() {

  const { data: session, status }: any = useSession();
  const [user, setUser] = useUser();
  const [isMyProfile, setIsMyProfile] = useState<boolean>(true)
  const [userSession, setUserSession] = useState<any>()
  const [jobs, setJobs] = useState([])
  

  let decoded: any;
  if (typeof session?.user?.access_token === "string") {
    decoded = jwtDecode(session?.user?.access_token);
  }

  const users = {
    posts: [
      {
        title: "hola",
        user: { firstName: 'Pedro', lastName: 'Fernadnez' },
        price: 30
      },
      {
        title: "hola",
        user: { firstName: 'Pedro', lastName: 'Fernadnez' },
        price: 30
      },
      {
        title: "hola",
        user: { firstName: 'Pedro', lastName: 'Fernadnez' },
        price: 30
      },
      {
        title: "hola",
        user: { firstName: 'Pedro', lastName: 'Fernadnez' },
        price: 30
      }
    ]
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

    useEffect(() => {
      async function getJobs() {
        const response = await getJobsByUser(user?.id)
        setJobs(response)
      }
      getJobs()
    }, [user])

console.log(jobs)
console.log(user)
  return (
    <section className="w-full">
      <div className="flex justify-end items-center w-full">
        <AddJobsModal sameUser={isMyProfile}/>
      </div>
    <section className=" justify-center items-end p-4 md:h-full min-h-72 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
    {users?.posts.map((post: any, index: number) => {
    //const date = dateDifference(post.creationDate)
    return (
      <div className="flex flex-col justify-between shadow-md h-60 rounded-2xl overflow-hidden" key={index}>
        <div className="bg-gray-200 w-full h-full">
          <img src="" alt="" />
        </div>
        <div className="flex justify-center w-full h-14 p-4 min-[1620px]:items-center items-start flex-col-reverse min-[1620px]:flex-row">
          <h2 className="flex-start text-lg text-primary-blue font-bold">
            {post.title}
          </h2>
        </div>
      </div>
    );
  })}
    </section >
    </section>
  );
}
