"use client";
import StayCard from '@/components/StayCard'; // This import may not be necessary
import { DEMO_STAY_LISTINGS } from '@/data/listings'; // This import may not be necessary
import React, { FC } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';
import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { Route } from '@/routers/types';
import { useRouter } from 'next/navigation';
import useStore from '../FormStore';
import FinalListingCard from '@/components/FinalListingCard';
import GallerySlider from '@/components/GallerySlider'; // Import GallerySlider

export interface PageAddListing10Props {}

const PageAddListing8: FC<PageAddListing10Props> = () => {
	const router = useRouter();
	const { ListingData } = useStore();

	// Prepare images for the GallerySlider
	

	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">Congratulations 🎉</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					Excellent, congratulations on completing the listing, it is waiting to
					be reviewed for publication
				</span>
			</div>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

			{/* FORM */}
			<div>
				<h3 className="text-lg font-semibold">This is your listing</h3>
				{/* Add the GallerySlider here */}
				 
				<div className="max-w-xs">
					<FinalListingCard className="mt-8" data={ListingData} />
				</div>
				<div className="mt-8 flex items-center space-x-5">
					<ButtonSecondary href={'/admin/listings/1' as Route}>
						<PencilSquareIcon className="h-5 w-5" />
						<span className="ml-3">Edit</span>
					</ButtonSecondary>

					<ButtonPrimary>
						<EyeIcon className="h-5 w-5" />
						<span className="ml-3">Preview</span>
					</ButtonPrimary>
				</div>
			</div>
		</>
	);
}

export default PageAddListing8;
