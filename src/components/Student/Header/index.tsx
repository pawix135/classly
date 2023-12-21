import { createAssignmentAction } from "@/actions/assignment";
import { signOutAction } from "@/actions/auth";
import Link from "next/link";

const StudentHeader = () => {
  return (
    <header
      className="w-full bg-secondary py-5 px-3"
      data-testid="student-header"
    >
      <nav
        className="flex flex-row gap-2 items-center"
        data-testid="student-nav"
      >
        <Link href={"/dashboard"}>
          <h1 className="text-3xl">Classly</h1>
        </Link>
        <div className="flex flex-row gap-5 ml-auto">
          <form action={createAssignmentAction}>
            <button>Settings</button>
          </form>
          <form action={signOutAction}>
            <button>Sign out</button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default StudentHeader;
