'use client'
import React, { FC, useState, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import useStore from '../FormStore'

export interface PageAddListing7Props {
	params?: { stepIndex: number }
}

const PageAddListing6: FC<PageAddListing7Props> = ({
	params = { stepIndex: 6 },
}) => {
	const index = Number(params.stepIndex) || 1
	const nextBtnText = index > 9 ? 'Publish listing' : 'Continue'
	const router = useRouter()
	const { toast } = useToast()
	const { ListingData, setCoverImage, setImages } = useStore()
	const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null)
	const [previewUrls, setPreviewUrls] = useState<string[]>([])
	const [showFrontImages, setShowFrontImages] = useState<boolean>(false)
	const [showCoverImage, setShowCoverImage] = useState<boolean>(false)
	console.log(coverPreviewUrl)
	useEffect(() => {
		if (ListingData.coverImage) {
			// If the cover image is a File object (e.g., from file input)
			if (
				typeof ListingData.coverImage === 'object' &&
				ListingData.coverImage instanceof File
			) {
				setCoverPreviewUrl(URL.createObjectURL(ListingData.coverImage))
			}
			// If the cover image is a URL string (e.g., from database or server)
			else if (typeof ListingData.coverImage === 'string') {
				setCoverPreviewUrl(
					process.env.NEXT_PUBLIC_SERVER_URL +
						'/storage/' +
						ListingData.coverImage,
				)
			}
		} else {
			// If no cover image exists
			setCoverPreviewUrl(null)
		}
	}, [ListingData.coverImage])

	useEffect(() => {
		if (ListingData.images && ListingData.images.length > 0) {
			// Create an array to store URLs
			const urls = ListingData.images.map((image:File | string) => {
				// If the image is a File object, create a blob URL
				if (image instanceof File) {
					return URL.createObjectURL(image)
				}
				// If the image is a string (assumed to be a URL), concatenate the server URL
				else if (typeof image === 'string') {
					return `${process.env.NEXT_PUBLIC_SERVER_URL}/storage/${image}`
				}
				// Return null for invalid types
				return null
			})

			// Filter out any null values (in case of invalid types) and set the preview URLs
			setPreviewUrls(urls.filter(Boolean))
		} else {
			// If no images exist, clear the preview URLs
			setPreviewUrls([])
		}
	}, [ListingData.images])

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const files = Array.from(event.target.files)

			// Check if the total count exceeds 5
			if (ListingData.images.length + files.length > 5) {
				return toast({
					variant: 'destructive',
					title: 'Image Limit Exceeded',
					description: 'You can upload a maximum of 5 images.',
				})
			}

			const updatedImages = [...ListingData.images, ...files]
			setImages(updatedImages) // Update store with new files
		}
	}

	const handleCoverImageChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0]
			setCoverImage(file) // Update store with cover image
			setCoverPreviewUrl(URL.createObjectURL(file))
		}
	}

	const handleRemoveImage = (index: number) => {
		const updatedImages = ListingData.images.filter(
			(_: any, i: number) => i !== index,
		)
		setImages(updatedImages) // Update store after removing an image
	}

	const handleRemoveCoverImage = () => {
		setCoverImage(null) // Update store
		setCoverPreviewUrl(null)
	}

	const NextBTN = () => {
		if (ListingData.images.length < 1) {
			return toast({
				variant: 'destructive',
				title: 'Popular Images are required',
				description: 'Image cannot be empty',
			})
		}
		if (ListingData.images.length < 5) {
			return toast({
				variant: 'destructive',
				title: 'Minimum 5 Images are required',
				description: `Add ${5 - ListingData.images.length} more images`,
			})
		}
		if (!ListingData.coverImage) {
			return toast({
				variant: 'destructive',
				title: 'Cover Image is required',
				description: 'Cover Image cannot be empty',
			})
		}
		router.push(`/admin/EditListing/${index + 1}`)
	}

	const BackBTN = () => {
		if (index > 1) {
			router.push(`/admin/EditListing/${index - 1}`)
		} else {
			router.push('/admin/EditListing/1')
		}
	}

	useEffect(() => {
		if (ListingData.images.length === 0) {
			setShowFrontImages(false)
		}
	}, [ListingData.images])

	useEffect(() => {
		if (!ListingData.coverImage) {
			setShowCoverImage(false)
		}
	}, [ListingData.coverImage])

	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">Pictures of the place</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					A few beautiful photos will help customers have more sympathy for your
					property.
				</span>
			</div>

			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			{/* FORM */}
			<div className="space-y-8">
				{/* Cover Image Section */}
				<div>
					<span className="text-lg font-semibold">Cover image</span>
					<div className="mt-5">
						<div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-neutral-300 px-6 pb-6 pt-5 dark:border-neutral-6000">
							<div className="space-y-1 text-center">
								<label
									htmlFor="cover-upload"
									className="relative cursor-pointer"
								>
									<span>Upload Cover Image</span>
									<input
										id="cover-upload"
										name="cover-upload"
										type="file"
										accept="image/*"
										onChange={handleCoverImageChange}
										className="sr-only"
									/>
								</label>
								<p className="text-xs text-neutral-500 dark:text-neutral-400">
									PNG, JPG, GIF up to 10MB
								</p>
							</div>
						</div>
					</div>
					<div className="mt-3 flex w-full items-center justify-between">
						<button
							onClick={() => setShowCoverImage(!showCoverImage)}
							disabled={!coverPreviewUrl}
							className="rounded-full border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:bg-slate-300"
						>
							{showCoverImage && coverPreviewUrl
								? 'Hide Cover Image'
								: 'Show Cover Image'}
						</button>
						<p>Cover Image: {ListingData.coverImage ? 'Uploaded' : 'None'}</p>
					</div>
					{/* Preview for Cover Image */}
					{showCoverImage && coverPreviewUrl && (
						<div className="relative mt-4">
							<img
								src={coverPreviewUrl}
								alt="Cover Preview"
								className="h-auto w-full rounded-md"
							/>
							<button
								onClick={handleRemoveCoverImage}
								className="absolute right-0 top-0 rounded bg-red-500 p-1 text-white"
							>
								<IoMdClose />
							</button>
						</div>
					)}
				</div>

				{/* Images Section */}
				<div>
					<span className="text-lg font-semibold">Pictures of the place</span>
					<div className="mt-5">
						<div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-neutral-300 px-6 pb-6 pt-5 dark:border-neutral-6000">
							<div className="space-y-1 text-center">
								<label
									htmlFor="file-upload"
									className="relative cursor-pointer"
								>
									<span>Upload Images (max 5 total)</span>
									<input
										id="file-upload"
										name="file-upload"
										type="file"
										accept="image/*"
										multiple
										onChange={handleImageChange}
										className="sr-only mb-4"
									/>
								</label>
								<p className="text-xs text-neutral-500 dark:text-neutral-400">
									PNG, JPG, GIF up to 10MB
								</p>
							</div>
						</div>
						<div className="mt-3 flex w-full items-center justify-between">
							<button
								onClick={() => setShowFrontImages(!showFrontImages)}
								disabled={!previewUrls.length}
								className="rounded-full border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:bg-slate-300"
							>
								{showFrontImages && previewUrls.length
									? 'Hide Images'
									: 'Show Images'}
							</button>
							<p>Image count: {previewUrls.length}</p>
						</div>

						<div className="mt-5 grid w-full grid-cols-2 gap-4">
							{showFrontImages &&
								previewUrls.map((url, index) => (
									<div key={index} className="relative">
										<img
											src={url}
											alt={`preview ${index}`}
											className="h-auto w-full rounded-md"
										/>
										<button
											onClick={() => handleRemoveImage(index)}
											className="absolute right-0 top-0 rounded bg-red-500 p-1 text-white"
										>
											<IoMdClose />
										</button>
									</div>
								))}
						</div>
					</div>
				</div>
				<div className="flex justify-end space-x-5">
					<button
						onClick={BackBTN}
						className="rounded-full border border-gray-600 bg-transparent px-5 disabled:!cursor-not-allowed disabled:!bg-slate-300 disabled:!text-slate-500"
						disabled={index === 1}
					>
						Go Back
					</button>
					<ButtonPrimary onClick={NextBTN}>{nextBtnText}</ButtonPrimary>
				</div>
			</div>
		</>
	)
}

export default PageAddListing6
