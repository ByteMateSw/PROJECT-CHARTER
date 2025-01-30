"use client";
import { useEffect, useState } from "react";
import { cardDetails } from "@/data/cards";
import NanoClamp from "nanoclamp";
import Image from "next/image";
import Link from "next/link";
import JobsModal from "@/app/components/Dashboard/JobsModal";
import Pagination from "@/app/components/pagination/Pagination";
import AddPostModal from '@/app/components/Dashboard/AddPostModal';
import { dateDifference } from '@/utils/functions'
import { useFilter } from "@/context/searchContext";


import { getAllPosts, searchPost } from '@/app/api/post';
//import { useSidebarState } from "@/app/components/Sidebar/hooks/useSidebarState";

export default function JobsPage() {
  const {search, city, setSearch, setCity, selectedProfessions} = useFilter()

  const [posts, setPosts] = useState<any>([])
  const [page, setPage] = useState<number>(0)
  const [changePage, setChangePage] = useState<number>(1)
  const [count, setCount] = useState<number>(0)
  const limit: number = 6


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await searchPost(page, limit, search, city.label)
        setPosts(response.posts)
        setCount(Math.ceil(response.count / limit))
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    setPage((changePage - 1)*limit)
    fetchPosts()
  },[page, limit, search, city, changePage, selectedProfessions])


  return (
    <>
    <div className="absolute top-1 left-7 h-12 w-full">
      <div className="flex justify-between items-center px-4">
      <Pagination totalPages={count} currentPage={changePage} onPageChange={setChangePage}/>
      <AddPostModal/>
      </div>
    </div>
    <article className="absolute left-6 h-full w-full grid grid-cols-1 grid-flow-row grid-rows-none md:grid-rows-3 xl:grid-rows-4 3xl:grid-rows-6 sm:grid-cols-2 md:grid-cols-2 2xl:grid-cols-3 gap-4 p-4 mt-14 overflow-auto">
      {posts.map((post: any, index: number) => {
        const date = dateDifference(post.creationDate)
        return (
          <JobsModal key={index} post={post} index={index}>
          <div className="flex flex-col justify-around h-52 shadow-md p-4 rounded-xl hover:cursor-pointer" key={index}>
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
                <div className="flex flex-col">
                <span className="ml-1 text-secondary-gray text-xs font-bold">
                  Ubicación
                </span>
                <span className="text-xs">
                  {post.city?.name}
                </span>
                </div>
              </div>
              {/* <Link className="btn btn-primary rounded-full h-8" href="/">
                Ver detalles
              </Link> */}
              {/* <JobsModal post={post} index={index}/> */}
            </div>
          </div>
          </JobsModal>
        );
      })}
    </article>
    
    </>
  );
}
