import { Button } from '@/components/ui/button'

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-semibold text-foreground">App shell</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Ready for the new workflow. Add requirements and run the spec-driven pipeline to generate the application.
      </p>
      <Button disabled>New workflow</Button>
    </div>
  )
}
