import Heading from '@/shared/Heading'
import React from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/Shadcncomponents/components/ui/accordion'
import Link from 'next/link'
const Page = () => {
	const booking = [
		{
			question: 'How do I search for a holiday home?',
			answer:
				'Use the search bar on our homepage to enter your destination, travel dates, and the number of guests. You can filter results by price, amenities, and ratings to find your perfect stay.',
		},
		{
			question: 'Can I cancel or modify my booking?',
			answer:
				'Yes, you can manage your booking through your account. Cancellation and modification policies vary by property, so please review the terms before booking.',
		},
		{
			question: 'How do I know a property is safe?',
			answer:
				'We verify all listings and encourage hosts to provide detailed descriptions, photos, and reviews. Additionally, our team regularly reviews safety standards to ensure your peace of mind.',
		},
	]
	const hosts = [
		{
			question: 'How do I list my property?',
			answer:
				'To list your property, click on “Become a Host” at the top of the homepage. Follow the guided steps to provide details, upload photos, and set pricing. Once submitted, our team will review your listing.',
		},
		{
			question: 'Are there fees for listing a property?',
			answer:
				'We charge a small service fee per booking to cover operational costs. You’ll find a detailed breakdown in your Host Dashboard.',
		},
	]
	const troubleShooting = [
		{
			question: 'I forgot my password. What should I do?',
			answer:
				"Click on the 'Forgot Password?' link on the login page. Enter your registered email address, and we'll send you instructions to reset your password.",
		},
		{
			question: 'Why am I unable to complete my booking?',
			answer:
				'Ensure that your payment method is valid and your internet connection is stable. If the problem persists, contact our support team for assistance.',
		},
		{
			question: 'What if there’s an issue with the property upon arrival?',
			answer:
				'Contact our support team immediately. We’ll work with you and the host to resolve any issues or find alternative accommodations.',
		},
	]

	return (
		<div>
			<div className="container my-14">
				<div className="flex flex-col items-center justify-center">
					<Heading desc="" className="">
						Help Center
					</Heading>
					<p className="mt-3 text-center">
						Welcome to the Brown Stone Holiday Homes Help Center! We`re here to
						make your experience seamless and enjoyable. Below, you`ll find
						answers to common questions, tips for booking, and details about our
						services.
					</p>
				</div>
				<div className="mt-20">
					<h2 className="text-lg font-[500]">General Questions </h2>
					<Accordion type="single" collapsible className="mt-1 w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger>
								How can I contact customer support?
							</AccordionTrigger>
							<AccordionContent>
								<div>
									<h3>Our support team is available 24/7. You can:</h3>
									<div className="flex items-start gap-2 mt-2">
										<div className="mt-1">
											<div className="size-2 rounded-full bg-primary-300" />
										</div>
										<h2 className="font-[500]">
											Email us at info@bsholidayhomes.com
										</h2>
									</div>
									<div className="flex items-start gap-2">
										<div className="mt-1">
											<div className="size-2 rounded-full bg-primary-300" />
										</div>
										<h2 className="font-[500]">Call us at +971 58 524 4501</h2>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single" collapsible className="mt-2 w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger>
								What payment methods are accepted?
							</AccordionTrigger>
							<AccordionContent>
								We accept major credit cards (Visa, Mastercard) and select local
								payment options based on your location.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
				<div className="my-10">
					<h2 className="text-lg font-[500]">Booking & Reservations</h2>
					<Accordion type="single" collapsible className="mt-1 w-full">
						{booking.map((faq, index) => (
							<AccordionItem value={`item-${index}`}>
								<AccordionTrigger>{faq.question}</AccordionTrigger>
								<AccordionContent>{faq.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
				<div className="my-10">
					<h2 className="text-lg font-[500]">For Hosts</h2>
					<Accordion type="single" collapsible className="mt-1 w-full">
						{hosts.map((faq, index) => (
							<AccordionItem value={`item-${index}`}>
								<AccordionTrigger className=" ">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent>{faq.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
				<div className="my-10">
					<h2 className="text-lg font-[500]">Troubleshooting</h2>
					<Accordion type="single" collapsible className="mt-1 w-full">
						{troubleShooting.map((faq, index) => (
							<AccordionItem value={`item-${index}`}>
								<AccordionTrigger className=" ">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent>{faq.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
				<div className="my-7">
					<h2 className="text-lg font-[500]">Additional Resources</h2>
					<div className="mt-1 flex items-start gap-2">
						<div className="mt-2">
							<div className="size-3 rounded-full bg-primary-300" />
						</div>
						<h2 className="1">
							<span className="font-[500]">Policies:</span> Learn more about our{' '}
							<Link
								className="underline underline-offset-4"
								href="/Terms-and-Conditions"
							>
								Terms of Service
							</Link>
							,{' '}
							<Link className="underline underline-offset-4" href="/Privacy-Policy">
								Privacy Policy
							</Link>{' '}
							and{' '}
							<Link className="underline underline-offset-4" href="/FAQ">
								FAQ
							</Link>
							.
						</h2>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page
