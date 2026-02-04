import Certificate from "@/components/dashboard/student/Certificate";
import NotFound from "@/components/dashboard/student/NotFound";
import { formatShortDate } from "@/lib/helper";
import { supabase } from "@/lib/supabase/client";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data: certificates, error } = await supabase
    .from("certificates")
    .select(
      "*,courses(*,instructors!courses_instructor_id_fkey (*,profiles(*))),profiles(*)",
    )
    .eq("user_id", id);

  if (error) {
    console.error("Error fetching certificates:", error);
    return <div>Error loading certificates.</div>;
  }

  console.log(certificates);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
      <div className="mt-6">
        {certificates && certificates.length > 0 ? (
          certificates.map((certificate) => {
            const {
              id,
              issued_at,
              profiles: { full_name: student },
              courses: { title: course },
            } = certificate;

            return (
              <Certificate
                key={id}
                student={student}
                course={course}
                date={formatShortDate(issued_at)}
              />
            );
          })
        ) : (
          <NotFound msg="No certificates found" />
        )}
      </div>
    </div>
  );
}
