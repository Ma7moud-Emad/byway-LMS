import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/lib/supabase";

import { FaPhoneAlt, FaStar, FaUser } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import {
  instructorDetails,
  ProfileDetails,
  social_icons_map,
} from "@/lib/types";
import CourseCard from "../courses/CourseCard";
import HomeContainer from "../shared/HomeContainer";
import { AiFillCaretRight } from "react-icons/ai";

export default async function InstructorDetails({ id }: { id: string }) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  const { avatar_url, full_name, phone, bio, username, email }: ProfileDetails =
    profile;

  const { data: instructor } = await supabase
    .from("instructors")
    .select("*")
    .eq("id", id)
    .single();

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("instructor_id", id);

  const {
    avg_rating,
    total_courses,
    expertise,
    headline,
    social_links,
    total_students,
  }: instructorDetails = instructor;

  return (
    <section>
      <div className="p-6">
        <div className="flex items-center space-x-4 border-b-2 border-b-gray-300 pb-4">
          <div className="rounded-full size-25 overflow-hidden relative">
            <Image
              src={avatar_url}
              alt={full_name}
              fill
              sizes="100%"
              className="object-cover object-top"
              priority
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
      <HomeContainer title="Instructor Courses">
        {courses && courses.length > 0 ? (
          <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
