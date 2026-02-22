import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/lib/supabase/client";

import { FaPhoneAlt, FaStar, FaUser } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { social_icons_map } from "@/lib/types";
import CourseCard from "../courses/CourseCard";
import HomeContainer from "../shared/HomeContainer";
import { AiFillCaretRight } from "react-icons/ai";
import Customers, { Review } from "../customers/Customers";

type Data = {
  id: string;
  headline: string;
  expertise: string[];
  social_links: {
    github: string;
    twitter: string;
    youtube: string;
    facebook: string;
    linkedin: string;
  };
  total_students: number;
  total_courses: number;
  avg_rating: number;
  is_verified: boolean;
  created_at: string;
  total_reviews: number;
  profiles: {
    id: string;
    bio: string;
    role: "instructor";
    email: string;
    phone: string;
    username: string;
    full_name: string;
    avatar_url: string;
    created_at: string;
    updated_at: string;
  };
  courses: {
    id: string;
    slug: string;
    tags: string[];
    level: string;
    price: number;
    title: string;
    poster: string;
    status: string;
    is_free: boolean;
    languages: string[];
    avg_rating: number;
    created_at: string;
    updated_at: string;
    category_id: string;
    description: string;
    is_featured: boolean;
    promo_video: string;
    published_at: string | null;
    requirements: string[];
    instructor_id: string;
    total_lessons: number;
    total_reviews: number;
    discount_price: number;
    total_students: number;
    learning_outcomes: string[];
    short_description: string;
    total_time_minutes: number;
  }[];
};

export default async function InstructorDetails({ id }: { id: string }) {
  const { data } = (await supabase
    .from("instructors")
    .select(
      `
    *,
    profiles(*),
    courses(*)
  `,
    )
    .eq("id", id)
    .single()) as {
    data: Data;
  };

  const { data: reviews } = await supabase
    .from("reviews")
    .select(
      `
    id,
    comment,
    profiles(avatar_url, full_name),
    courses!inner(instructor_id)
  `,
    )
    .eq("courses.instructor_id", id);

  const fltReviews: Review[] =
    reviews?.map((item) => {
      return {
        id: item.id,
        comment: item.comment,
        profiles: Array.isArray(item.profiles)
          ? item.profiles[0]
          : item.profiles,
      };
    }) ?? [];

  const {
    avg_rating,
    total_courses,
    expertise,
    headline,
    social_links,
    total_students,
    profiles: { avatar_url, full_name, phone, bio, username, email },
    courses,
  } = data;

  return (
    <section>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-x-4 border-b-2 border-b-gray-300 pb-4">
          <div className="rounded-full size-25 overflow-hidden relative">
            <Image
              src={avatar_url}
              alt={full_name}
              fill
              sizes="100%"
              className="object-cover object-top"
            />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold capitalize text-gray-900">
              {full_name}
            </h2>
            <p className="text-sm text-gray-500">{headline}</p>
            <p className="mt-2 text-gray-700">{bio}</p>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-3 xl:grid-cols-4">
          {expertise && (
            <List title="Expertise">
              {expertise.map((skill) => (
                <ListItem key={skill}>
                  <IoIosCheckmarkCircle className="text-gray-700 text-xl" />
                  {skill}
                </ListItem>
              ))}
            </List>
          )}
          {social_links && (
            <List title="Social Media">
              {Object.entries(social_links).map(([platform, url]) => {
                const Icon = social_icons_map[platform.toLowerCase()];
                return (
                  <ListItem key={platform}>
                    {Icon && <Icon className="text-xl" />}
                    <Link
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline capitalize"
                    >
                      {platform}
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          )}

          <List title="Experience">
            <ListItem>
              <AiFillCaretRight className="text-2xl -ml-1" />
              {total_courses}
            </ListItem>
            <ListItem>
              <PiStudentBold className="text-xl" />
              {total_students}
            </ListItem>
            <ListItem>
              <FaStar className="text-xl" />
              {avg_rating}
            </ListItem>
          </List>
          <div className="col-span-3 xl:col-span-1">
            <List title="contact">
              <ListItem>
                <MdEmail />
                <Link href={`mailto:${{ email }}`} className="underline">
                  {email}
                </Link>
              </ListItem>
              <ListItem>
                <FaPhoneAlt />
                <Link href={`tel:${{ phone }}`} className="underline">
                  {phone}
                </Link>
              </ListItem>
              <ListItem>
                <FaUser />
                {username}
              </ListItem>
            </List>
          </div>
        </div>
      </div>
      <HomeContainer title="Instructor Courses">
        {courses && courses.length > 0 ? (
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses?.map((item) => (
              <CourseCard
                key={item.id}
                title={item.title}
                avg_rating={item.avg_rating}
                discount_price={item.discount_price}
                instructor_id={item.instructor_id}
                poster={item.poster}
                total_lessons={item.total_lessons}
                total_reviews={item.total_reviews}
                total_time_minutes={item.total_time_minutes}
                level={item.level}
                price={item.price}
                id={item.id}
                role="instructor"
              />
            ))}
          </div>
        ) : (
          <p className="text-center font-semibold text-gray-900 py-10">
            No courses found for this instructor.
          </p>
        )}
      </HomeContainer>
      <Customers reviews={fltReviews} />
    </section>
  );
}

function List({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 my-2">{title}</h3>
      <ul>{children}</ul>
    </div>
  );
}
function ListItem({ children }: { children: ReactNode }) {
  return <li className="flex gap-1 items-center text-gray-700">{children}</li>;
}
