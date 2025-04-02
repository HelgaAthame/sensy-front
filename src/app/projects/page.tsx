import { Projects } from '@/features/projects/projects'

interface ProjectsPageProps {
  params: Promise<Record<string, never>>
  searchParams: Promise<{ canonical?: string }>
}

export default function ProjectsPage() {
  return <Projects />
}
