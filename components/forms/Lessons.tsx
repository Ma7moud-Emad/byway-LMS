"use client";

import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";

import { MdDeleteOutline } from "react-icons/md";
import { FiChevronDown, FiChevronUp, FiPlus } from "react-icons/fi";

import Button from "../ui/Button";
import Input from "./Input";
import { FileUploadPreview } from "./FileUploadPreview";
import { Course } from "./CreateForm";
import ResourcesArray from "./ResourcesArray";

type LessonsFormProps = {
  moduleIndex: number;
  control: Control<Course>;
  register: UseFormRegister<Course>;
};

export default function LessonsForm({
  moduleIndex,
  control,
  register,
}: LessonsFormProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons`,
  });

  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [videoPreviews, setVideoPreviews] = useState<{
    [key: string]: string | null;
  }>({});

  const toggleLesson = (lessonIndex: number) => {
    setActiveLesson((prev) => (prev === lessonIndex ? null : lessonIndex));
  };

  useEffect(() => {
    const keys = Object.keys(videoPreviews);
    return () => {
      keys.forEach((key) => {
        if (videoPreviews[key]) {
          URL.revokeObjectURL(videoPreviews[key]!);
        }
      });
    };
  }, [videoPreviews]);

  useEffect(() => {
    fields.forEach((lesson, lessonIndex) => {
      if (!lesson.video) return;

      const previewKey = `m${moduleIndex}-l${lessonIndex}`;
      const url = URL.createObjectURL(lesson.video);
      setVideoPreviews((prev) => ({
        ...prev,
        [previewKey]: url,
      }));
    });
  }, [fields, moduleIndex]);

  return (
    <div className="mt-3">
      <h3 className="font-bold text-xl mb-2">Lessons</h3>

      {fields.map((lesson, lessonIndex) => {
        return (
          <div
            key={lesson.id}
            className={`mb-2 shadow rounded-sm ${
              activeLesson !== lessonIndex ? "bg-blue-50" : ""
            }`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between p-3 cursor-pointer ${
                activeLesson === lessonIndex
                  ? "bg-blue-700 text-gray-50 rounded-t-sm mb-2"
                  : ""
              }`}
              onClick={() => toggleLesson(lessonIndex)}
            >
              <h3 className="font-semibold">
                {lesson.title || `Lesson ${lessonIndex + 1}`}
              </h3>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(lessonIndex);
                    setActiveLesson(null);
                  }}
                  className={`cursor-pointer ${
                    activeLesson === lessonIndex
                      ? "text-gray-50"
                      : "text-red-500"
                  }`}
                >
                  <MdDeleteOutline className="text-xl" />
                </button>

                {activeLesson === lessonIndex ? (
                  <FiChevronUp className="text-xl" />
                ) : (
                  <FiChevronDown className="text-xl" />
                )}
              </div>
            </div>

            {/* Body */}
            {activeLesson === lessonIndex && (
              <div className="p-3 space-y-4">
                {/* Title */}
                <Input
                  label="Title"
                  name={`modules.${moduleIndex}.lessons.${lessonIndex}.title`}
                  register={register}
                />

                {/* Description */}
                <Input
                  feildType="textarea"
                  label="Description"
                  name={`modules.${moduleIndex}.lessons.${lessonIndex}.description`}
                  register={register}
                  rows={4}
                />

                {/* Content Type */}
                <div>
                  <label className="block font-semibold mb-1">
                    Content Type
                  </label>
                  <select
                    {...register(
                      `modules.${moduleIndex}.lessons.${lessonIndex}.content_type`,
                    )}
                    className="w-full border p-2 rounded"
                  >
                    <option value="video">Video</option>
                  </select>
                </div>

                {/* Video Upload */}
                <Controller
                  control={control}
                  name={`modules.${moduleIndex}.lessons.${lessonIndex}.video`}
                  render={({ field }) => {
                    const previewKey = `m${moduleIndex}-l${lessonIndex}`;
                    const preview = videoPreviews[previewKey] || null;

                    return (
                      <FileUploadPreview
                        id={`lesson-m${moduleIndex}-l${lessonIndex}`}
                        label="Video"
                        accept="video/*"
                        type="video"
                        previewUrl={preview}
                        setFile={(file) => field.onChange(file)}
                        setPreviewUrl={() => {}}
                      />
                    );
                  }}
                />

                {/* Duration */}
                <Input
                  label="Duration (minutes)"
                  type="number"
                  name={`modules.${moduleIndex}.lessons.${lessonIndex}.duration_minutes`}
                  register={register}
                />

                {/* Order */}
                <Input
                  label="Order"
                  type="number"
                  name={`modules.${moduleIndex}.lessons.${lessonIndex}.order_number`}
                  register={register}
                />

                {/* Resources */}

                <ResourcesArray
                  moduleIndex={moduleIndex}
                  lessonIndex={lessonIndex}
                  control={control}
                  register={register}
                />

                {/* Free Preview */}
                <label className="flex items-center gap-2 cursor-pointer">
                  Free Preview
                  <input
                    type="checkbox"
                    {...register(
                      `modules.${moduleIndex}.lessons.${lessonIndex}.is_free_preview`,
                    )}
                  />
                </label>
              </div>
            )}
          </div>
        );
      })}

      {/* Add Lesson */}
      <Button
        classes="bg-blue-700 text-gray-50"
        clickedFun={() => {
          append({
            module_id: "",
            title: "",
            description: "",
            content_type: "video",
            video: null,
            video_url: "",
            duration_minutes: 0,
            order_number: fields.length + 1,
            is_free_preview: false,
            resources: [],
          });

          setActiveLesson(fields.length);
        }}
      >
        <p className="flex items-center gap-2">
          <FiPlus className="text-xl" />
          <span>Add Lesson</span>
        </p>
      </Button>
    </div>
  );
}
