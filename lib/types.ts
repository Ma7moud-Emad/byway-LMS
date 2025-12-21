import { loginSchema, signSchema, userSchema } from "./schema";
import { Url } from "next/dist/shared/lib/router/router";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { IconType } from "react-icons";
import z from "zod";
import {
  FaPaintBrush,
  FaBriefcase,
  FaLaptopCode,
  FaLanguage,
  FaCode,
  FaFacebook,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";
import { BsTwitterX } from "react-icons/bs";

export type BannerProps = {
  image: StaticImageData;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: Url;
};

export type HomeContainerProps = {
  title: string;
  ctaHref?: Url;
  children: ReactNode;
};

export type InputProps<T extends FieldValues> = {
  name: Path<T>;
  type?: string;
  placeholder?: string;
  label?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
};

export type SignFormProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  signin?: boolean;
  btnName?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export type CategoryCardProps = {
  title: string;
  count: number;
  Icon: IconType;
};

export const iconsMap = {
  FaPaintBrush: FaPaintBrush,
  FaBriefcase: FaBriefcase,
  FaLaptopCode: FaLaptopCode,
  FaLanguage: FaLanguage,
  FaCode: FaCode,
};
export type Category = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: keyof typeof iconsMap;
  num_courses: number;
};

export type LoginData = z.infer<typeof loginSchema>;

export type UserData = z.infer<typeof userSchema>;

export type SignData = z.infer<typeof signSchema>;

export type CourseCardProps = {
  title: string;
  avg_rating: number;
  discount_price: number;
  instructor_id: string;
  poster: string;
  total_lessons: number;
  total_reviews: number;
  total_time_minutes: number;
  level: string;
  price: number;
  short_description?: string;
  id: Url;
  type?: string;
  role?: string;
};

export const social_icons_map: Record<string, IconType> = {
  facebook: FaFacebook,
  twitter: BsTwitterX,
  github: FaGithub,
  youtube: GrYoutube,
  linkedin: FaLinkedin,
};

export type ProfileDetails = {
  avatar_url: string;
  full_name: string;
  phone: string;
  bio: string;
  username: string;
  email: string;
};

export type instructorDetails = {
  avg_rating: number;
  total_courses: number;
  expertise: string[];
  headline: string;
  social_links: Record<string, string>;
  total_students: number;
};
export type Filter = {
  title: string;
  param: string;
  items: string[];
  type?: "radio" | "checkbox";
};
export type SortOptions = {
  label: string;
  value: string;
};
export type Lesson = {
  id: number;
  title: string;
  duration_minutes: number;
  is_free_preview: boolean;
  video_url?: string;
  description: string;
};

export type Module = {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
};
export type CourseHeaderProps = {
  title: string;
  shortDescription: string;
  avgRating: number;
  totalStudents: number;
  level: string;
  promoVideo: string;
};
export type CourseProps = {
  price: number;
  discountPrice: number;
  totalLessons: number;
  totalMinutes: number;
  languages: string[];
};
export type ShortLesson = {
  title: string;
  video_url: string;
  description: string;
};
export type InstruictorProps = {
  name: string;
  headline: string;
  bio: string;
  expertise: string[];
  avgRating: number;
  totalStudents: number;
  id: string;
};
