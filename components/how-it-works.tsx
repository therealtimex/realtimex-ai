import { Badge } from "@/components/ui/badge"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Account",
      description: "Sign up in seconds with just your email. No credit card required to get started.",
    },
    {
      number: "02",
      title: "Configure Workspace",
      description: "Customize your workspace to match your team's unique workflow and requirements.",
    },
    {
      number: "03",
      title: "Boost Productivity",
      description: "Start using our powerful features to streamline processes and achieve your goals.",
    },
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-6 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-0"
          >
            How it Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Simple Process, Powerful Results
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get started in minutes and see the difference our platform can make for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
