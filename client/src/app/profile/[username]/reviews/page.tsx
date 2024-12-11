'use client'
import React, {useEffect, useState} from "react";
import { getAllReviews } from "@/app/api/review";
import StarRating from '@/app/components/StarRating/StarRating'
import AddReviewModal from "@/app/components/Dashboard/AddReviewModal";
import { getUserByUsername, getUserByEmail } from "@/app/api/user";
import { useUser } from "@/context/userContext";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

export default function Page({params}:{params: {username: string}}) {

  //const [reviews, setReviews] = useState<any>([])
  const [isMyProfile, setIsMyProfile] = useState<boolean>()
  const [userSession, setUserSession] = useState<any>()
  const { data: session, status }: any = useSession();
  const [user, setUser] = useUser()

  let decoded: any;
  if (typeof session?.user?.access_token === "string") {
    decoded = jwtDecode(session?.user?.access_token);
  }

  useEffect(() => {
    getUserByUsername(params.username).then((data) => {
      setUser(data);
    });
  }, []);

  // useEffect(() => {
  //   getAllReviews(0, 4, user?.id).then((data) => {
  //     setReviews(data)
  //   })
  // },[user])

  useEffect(() => {
    if (decoded != undefined) {
      if (decoded?.user.email === user?.email) {
        setIsMyProfile(true)
        return
      }
      getUserByEmail(decoded?.user.email)
      .then((res) => setUserSession(res))
      .catch((e) => console.error(e))
      setIsMyProfile(false)
    } else {
      if (session?.user?.email === user?.email) {
        setIsMyProfile(true)
        return
      }
      getUserByEmail(session?.user?.email)
      .then((res) => setUserSession(res))
      .catch((e) => console.error(e))
      setIsMyProfile(false)
    }

  },[session, user])


  return (
    <section className="flex flex-col justify-center items-start p-4 w-full">
      <div className="flex justify-between items-center w-full">
      <h2 className="text-xl font-bold ">Opiniones</h2>
      {isMyProfile ? <span></span> : <AddReviewModal userSession={userSession}/>}
      </div>
      {user?.reviews.length > 0 ?
      <article className="flex flex-wrap md:justify-start items-center pt-4 gap-4 w-full">
        {user?.reviews?.map((review:any) => (
        <div key={review.id} className="h-52 max-w-[22rem] rounded-[2.5rem] border border-secondary-gray p-4">
          <span className="inline-flex">
            <img
              className="h-10 w-h-10 border-2 border-secondary-black rounded-full mr-2"
              src={userSession ? 
                userSession.photo ? userSession.photo : "/svg/profile-circle.svg"
                :
                "/svg/profile-circle.svg"
              }
              alt="Foto de perfil"
            />
            <span className="flex flex-col">
              <label htmlFor="username" className="text-sm font-bold">
                {`${review.contractor.firstName} ${review.contractor.lastName}`}
              </label>
              <label
                htmlFor="username"
                className="text-secondary-gray text-xs font-normal"
              >
                Hace 1 año
              </label>
            </span>
          </span>
          <span className="w-full inline-flex gap-1">
            <StarRating starRating={review?.score} size={15}/>
            <p className="text-secondary-black text-sm">{Math.trunc((review.score) * 10) / 10}</p>
            <p className="ml-2 text-primary-blue text-sm">{review.hiring ? review.hiring :'Titulo del trabajo'}</p>
          </span>
          <p className="text-sm font-normal">
            {review.description}
          </p>
        </div>
        ))}
      </article>
      :
      <h2>No hay opiniones</h2>
      }
    </section>
  );
}
