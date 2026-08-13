import type { Metadata } from "next";
import { getProjects } from "@/lib/data";
import { ProjectsExplorer } from "@/components/project/ProjectsExplorer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore our private collection of pre-vetted luxury residential and commercial addresses.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsExplorer projects={projects} />;
}
