import React from 'react'
import Heading from '@/shared/Heading'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/Shadcncomponents/components/ui/accordion'
const page = () => {
	const faqData = [
		{
			question: 'How do I book a holiday home?',
			answer:
				"Browse our available properties, select your preferred dates, and complete the booking form. Once payment is confirmed, you'll receive a booking confirmation email.",
		},
		{
			question: 'Can I make changes to my booking?',
			answer:
				'Yes, you can modify your booking by contacting our support team. Changes are subject to availability and may incur additional fees.',
		},
		{
			question: 'What is your cancellation policy?',
			answer:
				'Cancellation terms vary depending on the property. Please refer to the specific property’s cancellation policy outlined during booking.',
		},
		{
			question: 'What payment methods are accepted?',
			answer:
				'We accept credit cards, debit cards, and select online payment platforms. Full details will be provided during the booking process.',
		},
		{
			question: 'Is my payment secure?',
			answer:
				'Yes, we use encrypted payment gateways to ensure your transaction is safe and secure.',
		},
		{
			question: 'What are the check-in and check-out times?',
			answer:
				'Standard check-in is from 3:00 PM, and check-out is by 11:00 AM. Some properties may offer flexible timings upon request.',
		},
		{
			question: 'What amenities are included in the holiday home?',
			answer:
				'Each property is fully furnished and equipped with essential amenities like Wi-Fi, kitchen appliances, and toiletries. Specific amenities are listed on the property’s page.',
		},
		{
			question: 'Who do I contact in case of an issue during my stay?',
			answer:
				'Our customer support team is available 24/7 to assist you. Contact details will be provided in your booking confirmation.',
		},
		{
			question: 'Can I request additional services, such as housekeeping?',
			answer:
				'Yes, additional services can be arranged for an extra fee. Please contact us in advance to discuss your needs.',
		},
		{
			question: 'Are pets allowed in the holiday homes?',
			answer:
				'Pet policies vary by property. Check the property details or filter for pet-friendly options during your search.',
		},
		{
			question: 'Can I host events or parties at the property?',
			answer:
				'Hosting events is subject to the property’s guidelines and prior approval. Please contact the property for clarification.',
		},
		{
			question: 'How can I contact customer support?',
			answer:
				'Reach us via phone and email. Our support team is available 24/7.',
		},
		{
			question: 'What measures are taken for cleanliness and hygiene?',
			answer:
				'All properties are cleaned and sanitized thoroughly between stays, following industry-standard protocols.',
		},
		{
			question: 'Can I extend my stay?',
			answer:
				'Extensions are possible depending on availability. Contact the property as soon as possible to make arrangements.',
		},
		{
			question: 'Are holiday homes suitable for long-term stays?',
			answer:
				'Many properties are available for extended stays. Discounts and additional amenities may be offered for long-term bookings. Contact the property for details.',
		},
		{
			question: 'Can I request an early check-in or late check-out?',
			answer:
				'Early check-ins and late check-outs can be arranged based on availability. Additional charges may apply.',
		},
		{
			question: 'Is parking available at the holiday homes?',
			answer:
				'Most properties offer parking facilities. Check the property details for specific information or contact us if you have questions.',
		},
		{
			question: 'Are the properties child-friendly?',
			answer:
				'Many of our holiday homes are family-friendly and equipped with amenities for children. Check the property description or reach out to us for recommendations.',
		},
		{
			question: 'Do you offer travel insurance?',
			answer:
				'We do not provide travel insurance, but we highly recommend purchasing it to cover unforeseen circumstances during your trip.',
		},
		{
			question: 'Can I get a detailed invoice for my booking?',
			answer:
				'Yes, invoices can be provided upon request. Contact us if you need assistance.',
		},
		{
			question: 'What if there is severe weather during my stay?',
			answer:
				'In case of severe weather, please follow local safety guidelines and contact us for assistance. Rescheduling may be considered depending on the situation.',
		},
		{
			question: 'Are holiday homes equipped with emergency supplies?',
			answer:
				'Some properties may include basic emergency kits. Check the property details or contact us if this is a concern.',
		},
		{
			question: 'Can I book multiple properties for a group trip?',
			answer:
				'Yes, we can help you coordinate bookings for multiple properties for group travel. Contact us for assistance.',
		},
	]

	return (
		<div>
			<div className="container my-14">
				<div className="flex justify-center">
					<Heading desc="" className="">
						Terms & Conditions
					</Heading>
				</div>
				<Accordion type="single" collapsible className="my-14 w-full">
					{faqData.map((faq, index) => (
						<AccordionItem key={index} value={`item-${index}`}>
							<AccordionTrigger className='font-[600] text-md'>{faq.question}</AccordionTrigger>
							<AccordionContent>{faq.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</div>
	)
}

export default page
