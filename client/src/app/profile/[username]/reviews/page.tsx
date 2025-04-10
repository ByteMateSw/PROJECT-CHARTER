'use client'
import React, {useEffect, useState} from "react";
import { getAllReviews } from "@/app/api/review";
import StarRating from '@/app/components/StarRating/StarRating'
import AddReviewModal from "@/app/components/Dashboard/AddReviewModal";
import Pagination from "@/app/components/pagination/Pagination";
import { getUserByUsername, getUserByEmail } from "@/app/api/user";
import { useUser } from "@/context/userContext";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

export default function Page({params}:{params: {username: string}}) {

  //const [reviews, setReviews] = useState<any>([])
  const [isMyProfile, setIsMyProfile] = useState<boolean>(true)
  const [userSession, setUserSession] = useState<any>()
  const [reviews, setReviews] = useState([])
  const [changePage, setChangePage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(1)
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

    setReviews(user.reviews)
  },[user])



  const indexOfLastItem = changePage * 4
  const indexOfFirstItem = indexOfLastItem - 4;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

  const totalPage = Math.ceil(reviews.length / 4)


  return (
    <section className="flex flex-col justify-center items-start p-4 w-full min-h-72 md:h-full ">
      <div className="flex justify-between items-center w-full">
      <h2 className="text-xl font-bold ">Opiniones</h2>
      {session ? 
        isMyProfile ? <span></span> : <AddReviewModal userSession={userSession}/>
      :
      <span></span>
    }
      </div>
      {user?.reviews.length > 0 ?
      <article className="flex flex-wrap md:justify-start items-center pt-4 gap-4 w-full">
        {currentItems.map((review:any) => (
        <div key={review.id} className="h-40 w-full rounded-lg border border-gray-200 p-4">
          <div className="inline-flex w-full">
            <img
              className="h-10 w-h-10 border-2 border-secondary-black rounded-full mr-2"
              src={userSession ? 
                userSession.photo ? userSession.photo : "/svg/profile-circle.svg"
                :
                "/svg/profile-circle.svg"
              }
              alt="Foto de perfil"
            />
            <div className="flex justify-between items-center w-full">
              <label htmlFor="username" className="text-sm font-bold">
                {`${review.contractor.firstName} ${review.contractor.lastName}`}
              </label>
              <label
                htmlFor="username"
                className="text-secondary-gray text-xs font-normal"
              >
                Hace 1 año
              </label>
            </div>
          </div>
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
      <div className="flex justify-center items-center w-full">
        <Pagination currentPage={changePage} totalPages={totalPage} onPageChange={setChangePage}/>
      </div>
      </article>
      :
      <h2>No hay opiniones</h2>
      }
    </section>
  );
}
