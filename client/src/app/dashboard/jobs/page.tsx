"use client";
import { useEffect, useState } from "react";
import { cardDetails } from "@/data/cards";
import NanoClamp from "nanoclamp";
import Image from "next/image";
import Link from "next/link";
import JobsModal from "@/app/components/Dashboard/JobsModal";

import { getAllPosts } from '@/app/api/post';

export default function JobsPage() {

  const [posts, setPosts] = useState<any>([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts()
        setPosts(response)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  },[])

  console.log(posts)
  return (
    <article className="h-32 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {posts.map((post: any, index: number) => {
        return (
          <div className="flex flex-col justify-around shadow-md p-4 rounded-xl" key={index}>
            <span className="flex md:justify-between min-[1620px]:items-center items-start flex-col-reverse min-[1620px]:flex-row">
              <h2 className="flex-start text-lg text-primary-blue font-bold">
                {post.title}
              </h2>
              <h6 className="flex-end text-xs text-secondary-gray">
                Publicado hace 17 días
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
  );
}
