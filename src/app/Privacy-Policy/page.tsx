import Heading from '@/shared/Heading'
import React from 'react'
const Page = () => {
	return (
		<div>
			<div className="container my-14">
				<div className="flex justify-center">
					<Heading desc="" className="">
						Privacy Policy
					</Heading>
				</div>
				<div>
					<p className="mt-3 text-center">
						Brownstone Homes values your privacy and is committed to protecting
						your personal information. This Privacy Policy explains how we
						collect, use, and share information about you when you visit our
						website, make a booking, or interact with us in other ways.
					</p>
					<p className='mt-10'>
						<span className="font-[500]">Effective Date:</span> 01/01/2024
					</p>
					<p>
						<span className="font-[500]">Last updated:</span> 27/12/2024
					</p>
				</div>

				<div className="mb-10 mt-7">
					<div className="flex items-start gap-2">
						<div className="mt-2">
							<div className="size-3 rounded-full bg-primary-300" />
						</div>
						<h2 className="text-xl font-[500]"> Information We Collect</h2>
					</div>
					<p className="mt-2">
						We may collect personal information, such as your name, email
						address, phone number, billing details, and booking preferences or
						history. Additionally, we may gather non-personal information like
						your browser type, device type, IP address, and the pages you view
						on our website. Information you provide directly, such as inquiries
						submitted through contact forms or reviews, is also collected to
						enhance our services.
					</p>
				</div>
				<div className="my-10">
					<div className="flex items-start gap-2">
						<div className="mt-2">
							<div className="size-3 rounded-full bg-primary-300" />
						</div>
						<h2 className="text-xl font-[500]"> How We Use Your Information</h2>
					</div>
					<p className="mt-2">
						Your information is used to facilitate bookings, communicate with
						you about inquiries or reservations, personalize your experience,
						process payments securely, and comply with legal obligations. We may
						also use your data to send promotional offers, but only with your
						consent. Non-personal information helps us analyze website
						performance and improve user experience.
					</p>
				</div>
				<div className="my-10">
					<div className="flex items-start gap-2">
						<div className="mt-2">
							<div className="size-3 rounded-full bg-primary-300" />
						</div>
						<h2 className="text-xl font-[500]">Sharing Your Information</h2>
					</div>
					<p className="mt-2">
						We do not sell or rent your personal information. However, we may
						share it with third-party service providers who assist with payment
						processing, marketing, or hosting services. In some cases, relevant
						details may be shared with property owners to manage your bookings.
						Additionally, we may disclose information if required by law or to
						protect our legal rights.
					</p>
				</div>
				<div className="my-10">
					<div className="flex items-start gap-2">
						<div className="mt-2">
							<div className="size-3 rounded-full bg-primary-300" />
						</div>
						<h2 className="text-xl font-[500]">
							{' '}
							Cookies and Tracking Technologies
						</h2>
					</div>
					<p className="mt-2">
						Our website uses cookies to enhance your browsing experience.
						Cookies are small text files stored on your device that help us
						understand your preferences and improve functionality. You can
						manage your cookie settings through your browser, though disabling
						cookies may impact the website’s performance.
					</p>
				</div>
				<div className="my-10">
					<div className="flex items-start gap-2">
						<div className="mt-2">
							<div className="size-3 rounded-full bg-primary-300" />
						</div>
						<h2 className="text-xl font-[500]">Your Rights</h2>
					</div>
					<p className="mt-2">
						You have rights regarding your personal data, including accessing or
						correcting the information we hold about you, requesting data
						deletion (subject to legal requirements), and opting out of
						marketing communications. To exercise these rights, please contact
						us at info@bsholidayhomes.com.
					</p>
				</div>
				<div className="my-10">
					<div className="flex items-start gap-2">
						<div className="mt-2">
							<div className="size-3 rounded-full bg-primary-300" />
						</div>
						<h2 className="text-xl font-[500]"> Security</h2>
					</div>
					<p className="mt-2">
						We take reasonable security measures to protect your information
						from unauthorized access, alteration, or disclosure. While we strive
						to ensure data security, no transmission over the internet is
						entirely secure. Please take appropriate precautions when sharing
						personal information online.
					</p>
				</div>
				<div className="my-10">
					<div className="flex items-start gap-2">
						<div className="mt-2">
							<div className="size-3 rounded-full bg-primary-300" />
						</div>
						<h2 className="text-xl font-[500]"> Third-Party Links</h2>
					</div>
					<p className="mt-2">
						Our website may contain links to third-party websites, which are
						governed by their own privacy policies. We are not responsible for
						the privacy practices or content of these external sites, and we
						encourage you to review their policies before interacting with them.
					</p>
				</div>
				<div className="my-10">
					<div className="flex items-start gap-2">
						<div className="mt-2">
							<div className="size-3 rounded-full bg-primary-300" />
						</div>
						<h2 className="text-xl font-[500]">
							{' '}
							Updates to This Privacy Policy
						</h2>
					</div>
					<p className="mt-2">
						This Privacy Policy may be updated periodically to reflect changes
						in our practices or legal obligations. Any updates will be posted on
						this page with the revised effective date. We encourage you to
						review this policy regularly to stay informed.
						<br />
						<br />
						If you have any questions or concerns about this Privacy Policy,
						please contact us atinfo@bsholidayhomes.com. You may also reach us
						by phone at +971 58 524 4501.
					</p>
				</div>
			</div>
		</div>
	)
}

export default Page
