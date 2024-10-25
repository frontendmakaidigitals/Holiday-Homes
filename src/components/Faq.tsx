import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/Shadcncomponents/components/ui/accordion'
const FAQ = () => {
	const questions: { question: string; answer: string }[] = [
		{
			question: 'What commission do I pay BSHH and when do I pay it?',
			answer:
				'We operate on a commission-based model, where you pay a set percentage on each reservation, including non-refundable bookings, which will be charged regardless of guest stay. You`ll receive a monthly invoice via email and payment can be conveniently made in a single monthly instalment, with additional details and payment history accessible in the `Finance` tab of your extranet',
		},
		{
			question: 'How do you handle fraudluent bookings?',
			answer:
				'We have teams dedicated to creating, maintaining and improving controls to mitigate and prevent fraudulent bookings. There are also measures that you can take to protect your business and ways to report a suspected fake booking. To make sure you receive real bookings from real people, you can set up your property to only accept reservations from bookers with a verified phone number and/or home address. Cancellation policies and fees can also help protect you from a potential loss of income. Learn more about identifying, preventing and reporting fake bookings.',
		},
		{
			question: 'How can I change the information shown on my property page?',
			answer:
				'You can add a variety of content to give your listing more detail and make it more attractive to potential guests. We use your facilities, location details and other items from your property information to auto-generate a property description containing the most relevant information for potential guests.',
		},
		{
			question: 'Can I choose when I get my first Reservation?',
			answer:
				'In most cases, once your status is set to open/bookable, you can see your property page on our platform available for bookings, starting with the first day you set available in your calendar. If you prefer to have more control over your bookings, depending on your property type you may be able to use the Request to Book feature, with which guests are required to send a booking request that you can accept or decline.',
		},
		{
			question: 'Do I have to finish my Registration in one go?',
			answer:
				'You can come back to your registration at a later time if you do not finish in one go. We will inform you periodically if anything is missing, so that you can successfully complete your registration.',
		},
		{
			question:
				'Can I pause my property listing after completing the registration?',
			answer:
				'You can pause (snooze) your listing for specific periods after finishing your registration and going open/bookable. However, any bookings that you have already received must be honoured.',
		},
	]
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
				{questions.map((faq, index) => (
					<AccordionItem key={index} value={`item-${index}`}>
						<AccordionTrigger className="text-lg text-start">
							{faq.question}
						</AccordionTrigger>
						<AccordionContent>{faq.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	)
}

export default FAQ
