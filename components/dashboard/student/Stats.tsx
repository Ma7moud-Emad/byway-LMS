import {
  MdOutlineAutorenew,
  MdOutlineCheckCircle,
  MdOutlineMenuBook,
} from "react-icons/md";
import State from "./State";
import { TbCancel } from "react-icons/tb";

type StatsProps = {
  coursesStats: {
    enrolled_courses?: number;
    completed_courses?: number;
    active_courses?: number;
    cancelled_courses?: number;
  };
};
export default function Stats({ coursesStats }: StatsProps) {
  return (
    <div
      className={`my-4 grid gap-4 grid-cols-1 sm:grid-cols-2 ${coursesStats.cancelled_courses !== undefined ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
    >
      {coursesStats.enrolled_courses !== undefined && (
        <State
          icon={MdOutlineMenuBook}
          label="enrolled "
          count={coursesStats.enrolled_courses}
        />
      )}
      {coursesStats.completed_courses !== undefined && (
        <State
          icon={MdOutlineCheckCircle}
          label="completed "
          count={coursesStats.completed_courses}
          iconBgColor="bg-green-100"
          iconColor="text-green-500"
        />
      )}
      {coursesStats.active_courses !== undefined && (
        <State
          icon={MdOutlineAutorenew}
          label="active "
          count={coursesStats.active_courses}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-500"
        />
      )}
      {coursesStats.cancelled_courses !== undefined && (
        <State
          icon={TbCancel}
          label="Cancelled "
          count={coursesStats.cancelled_courses}
          iconBgColor="bg-red-100"
          iconColor="text-red-500"
        />
      )}
    </div>
  );
}
