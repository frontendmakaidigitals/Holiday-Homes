import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/Shadcncomponents/components/ui/accordion'
const FAQ = ({ data }: { data: { question: string; answer: string }[] }) => {
	return (
		<div className="">
			<div className="flex w-full items-center justify-center">
				<p className="rounded-full border border-gray-300 px-5 py-1 text-xl">
					FAQ
				</p>
			</div>
			<div className="mt-3 flex w-full items-center justify-center">
				<p className="text-3xl font-semibold lg:text-5xl">
					Frequently Asked Questions
				</p>
			</div>
			<Accordion type="single" collapsible className="mt-14 w-full">
				{data?.map((faq, index) => (
					<AccordionItem key={index} value={`item-${index}`}>
						<AccordionTrigger className="text-start text-xl">
							{faq.question}
						</AccordionTrigger>
						<AccordionContent className="text-lg">
							{faq.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	)
}

export default FAQ
