import { TeacherSignOutAction } from "@/actions/Teacher/auth";
import { teacherAuth } from "@/utils/useAuth";
import Link from "next/link";

const TeacherHeader = () => {
  let teacher = teacherAuth();

  return (
    <header
      className="w-full bg-secondary py-5 px-3"
      data-testid="teacher-header"
    >
      <nav
        className="flex flex-row gap-2 items-center"
        data-testid="teacher-nav"
      >
        <Link href={"/teacher/dashboard"}>
          <h1 className="text-3xl">Classly - Teacher</h1>
        </Link>
        <div className="flex flex-row gap-5 ml-auto">
          {teacher && (
            <form action={TeacherSignOutAction}>
              <button>Sign out</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default TeacherHeader;
