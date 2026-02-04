"use client";

import { useFieldArray, Control, Controller } from "react-hook-form";
import { MdDeleteOutline } from "react-icons/md";
import { FiChevronDown, FiChevronUp, FiPlus } from "react-icons/fi";
import { useState } from "react";
import Button from "../ui/Button";
import ResourcesField from "./ResourcesField";
import { FileUploadPreview } from "./FileUploadPreview";
import Input from "./Input";

type LessonsFormProps = {
  moduleIndex: number;
  control: Control<any>;
};

export default function LessonsForm({
  moduleIndex,
  control,
}: LessonsFormProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons`,
  });

  const [activeLesson, setActiveLesson] = useState<number | null>(null);

  const toggle = (lessonIndex: number) => {
    setActiveLesson(activeLesson === lessonIndex ? null : lessonIndex);
  };

  return (
    <div className="mt-3">
      <h3 className="font-bold text-xl mb-2">Lessons</h3>

      {fields.map((lesson, lessonIndex) => (
        <div
          key={lesson.id}
          className={`mb-2 shadow rounded-sm ${activeLesson !== lessonIndex && "bg-blue-50"}`}
        >
          <div
            className={`flex items-center justify-between p-3 ${activeLesson === lessonIndex && "bg-blue-700 text-gray-50 rounded-t-sm mb-2"}`}
          >
            <h3>{lesson.title || `Lesson ${lessonIndex + 1}`}</h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => remove(lessonIndex)}
                className={`cursor-pointer ${activeLesson === lessonIndex ? "text-gray-50" : "text-red-500"}`}
              >
                <MdDeleteOutline className="text-xl" />
              </button>
              <button
                type="button"
                onClick={() => toggle(lessonIndex)}
                className="cursor-pointer"
              >
                {activeLesson === lessonIndex ? (
                  <FiChevronUp className="text-xl" />
                ) : (
                  <FiChevronDown className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {activeLesson === lessonIndex && (
            <div className="p-3">
              {/* Title */}
              <Input
                label="Title"
                name={`modules.${moduleIndex}.lessons.${lessonIndex}.title`}
                register={control.register}
              />

              {/* Description */}
              <Input
                feildType="textarea"
                label="Description"
                name={`modules.${moduleIndex}.lessons.${lessonIndex}.description`}
                register={control.register}
                rows={4}
              />

              {/* Content Type */}
              <div className="mb-4">
                <label className="block font-semibold mb-1">Content Type</label>
                <select
                  {...control.register(
                    `modules.${moduleIndex}.lessons.${lessonIndex}.content_type` as const,
                  )}
                  className="w-full border p-2 rounded"
                >
                  <option value="video">Video</option>
                </select>
              </div>

              {/* Video Upload باستخدام Controller */}
              <Controller
                control={control}
                name={`modules.${moduleIndex}.lessons.${lessonIndex}.video`}
                render={({ field }) => (
                  <FileUploadPreview
                    id={`lesson-m${moduleIndex}-l${lessonIndex}`}
                    label="Video"
                    accept="video/*"
                    type="video"
                    previewUrl={
                      field.value ? URL.createObjectURL(field.value) : null
                    }
                    setFile={(file) => field.onChange(file)}
                    setPreviewUrl={() => {}}
                  />
                )}
              />

              {/* Duration */}
              <Input
                label="Duration (minutes)"
                type="number"
                name={`modules.${moduleIndex}.lessons.${lessonIndex}.duration_minutes`}
                register={control.register}
              />

              {/* Order */}
              <Input
                label="Order"
                type="number"
                name={`modules.${moduleIndex}.lessons.${lessonIndex}.order_number`}
                register={control.register}
              />

              {/* Resources */}
              <ResourcesField
                moduleIndex={moduleIndex}
                lessonIndex={lessonIndex}
                control={control}
              />

              {/* Free Preview */}
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                Free Preview
                <input
                  type="checkbox"
                  {...control.register(
                    `modules.${moduleIndex}.lessons.${lessonIndex}.is_free_preview` as const,
                  )}
                />
              </label>
            </div>
          )}
        </div>
      ))}

      {/* Add Lesson Button */}
      <Button
        classes="bg-blue-700 text-gray-50"
        clickedFun={() => {
          append({
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
          setActiveLesson(fields.length); // افتح Lesson الجديدة مباشرة
        }}
      >
        <p className="flex items-center gap-2">
          <FiPlus className="text-xl" /> <span>Add Lesson</span>
        </p>
      </Button>
    </div>
  );
}
