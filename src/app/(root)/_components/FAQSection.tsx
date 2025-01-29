import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is the purpose of this platform?",
    answer:
      "This platform connects learners with skilled teachers to facilitate knowledge sharing and skill development through personalized sessions.",
  },
  {
    question: "How can I arrange a session?",
    answer:
      "Simply find the skill you are interested in, click the 'Arrange Session' button, and follow the prompts to book your time with the teacher.",
  },
  {
    question: "Are there any prerequisites for skills?",
    answer:
      "Some skills may have recommended prerequisites to ensure a productive learning experience. Check the skill description for details.",
  },
  {
    question: "Can I become a teacher on this platform?",
    answer:
      "If you have a skill to share, you can apply to become a teacher. Visit our 'Become a Teacher' page for more information.",
  },
  {
    question: "What if I need to cancel a session?",
    answer:
      "You can cancel a session through your account settings. Please do so at least 24 hours in advance to avoid any cancellation fees.",
  },
  {
    question: "Is there customer support available?",
    answer:
      "Yes, our customer support team is available 24/7 to assist you with any inquiries or issues you may have while using the platform.",
  },
]

export default function FAQSection() {
  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600">Your Questions, Answered</p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 py-2 bg-white shadow-sm">
            <AccordionTrigger className="text-left font-medium hover:no-underline">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-2 pb-4">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

