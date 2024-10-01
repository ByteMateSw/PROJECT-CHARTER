"use client";
import { useEffect, useState } from "react";
import { cardDetails } from "@/data/cards";
import NanoClamp from "nanoclamp";
import Image from "next/image";
import Link from "next/link";
import JobsModal from "@/app/components/Dashboard/JobsModal";
import AddPostModal from '@/app/components/Dashboard/AddPostModal';
import { dateDifference } from '@/utils/functions'
import { useFilter } from "@/context/searchContext";


import { getAllPosts, searchPost } from '@/app/api/post';
//import { useSidebarState } from "@/app/components/Sidebar/hooks/useSidebarState";

export default function JobsPage() {
  const {search, city, setSearch, setCity} = useFilter()

  const [posts, setPosts] = useState<any>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(9)


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await searchPost(page, limit, search, city.value)
        setPosts(response)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  },[page, limit, search, city])

  // const dateDifference = (date: Date) => {
  //   const fecha1 = new Date(date);
  //   const fecha2 = new Date();
  
  //   // Calculamos la diferencia en milisegundos
  //   const diferenciaMilisegundos = fecha2.getTime() - fecha1.getTime();
  
  //   // Convertimos la diferencia a horas y días
  //   const diferenciaHoras = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));
  //   const diferenciaDias = Math.floor(diferenciaHoras / 24);
  //   if(diferenciaDias < 24) {
  //     if(diferenciaHoras === 1) {
  //       return {
  //         time: diferenciaHoras,
  //         unit: 'hora'
  //       }
  //     }
  //     return {
  //       time: diferenciaHoras,
  //       unit: 'horas'
  //     }
  //   }
  //   if (diferenciaDias === 1) {
  //     return {
  //       time: diferenciaDias,
  //       unit: 'dia'
  //     }
  //   }
  //   return {
  //     time: diferenciaDias,
  //     unit: 'dias'
  //   }
  // }

  console.log(posts)
  console.log(city)
  return (
    <>
    <div className="absolute right-1 top-1 h-12">
      <AddPostModal/>
    </div>
    <article className="h-full w-full grid grid-cols-2 grid-flow-row sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-14 overflow-auto border">
      {posts.map((post: any, index: number) => {
        const date = dateDifference(post.creationDate)
        return (
          <div className="flex flex-col justify-around h-80 shadow-md p-4 rounded-xl" key={index}>
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
                <Image
                  src="/svg/location.svg"
                  alt="Location Icon"
                  width={20}
                  height={20}
                />
                <span className="ml-1 text-secondary-gray text-xs font-bold">
                  Ubicación
                </span>
              </div>
              {/* <Link className="btn btn-primary rounded-full h-8" href="/">
                Ver detalles
              </Link> */}
              <JobsModal post={post} index={index}/>
            </div>
          </div>
        );
      })}
    </article>
    
    </>
  );
}
