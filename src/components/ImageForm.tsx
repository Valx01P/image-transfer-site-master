"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { imageFormSchema } from "../lib/database/validator"
import * as z from 'zod'
import { imageDefaultValues } from "../constants/index"
import { useState } from "react"
// import Image from "next/image"
import { useUploadThing } from '../lib/database/uploadthing'

import { useRouter } from "next/navigation"
import { createImage } from "../lib/actions/image.action"
// import { IImage } from "../lib/database/models/image.model"
import { FileUploader } from './FileUploader';


type ImageFormProps = {
  userId: string
}

const ImageForm = ({ userId }: ImageFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter();
  const initialValues = imageDefaultValues;

  const { startUpload } = useUploadThing('imageUploader')
  // console.log(userId)

  const form = useForm<z.infer<typeof imageFormSchema>>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: initialValues
  })
 

  async function onSubmit(values: z.infer<typeof imageFormSchema>) {
    let uploadedImageUrl = values.imageUrl;
    // console.log(userId)

  
    if (files.length > 0) {
      try {
        const uploadedImages = await startUpload(files);
  
        if (!uploadedImages) {
          throw new Error('Error in file upload');
        }
  
        uploadedImageUrl = uploadedImages[0].url;
      } catch (uploadError) {
        console.error('Error in file upload:', uploadError);
        return;
      }
    }
  
    try {
      const newImage = await createImage({
        image: { imageUrl: uploadedImageUrl },
        userId,
        path: '/dashboard',
      });
  
      if (newImage) {
        form.reset();
        setFiles([]);
        router.push(`/dashboard`);
      }
    } catch (imageError) {
      console.error('Error creating image:', imageError);
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="items-center flex flex-col gap-5 justify-center">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <FileUploader 
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <Button 
        type="submit"
        size="lg"
        disabled={form.formState.isSubmitting || files.length < 1}
        className="button col-span-2 w-1/2 max-md:w-full bg-purple-900 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
        {form.formState.isSubmitting ? (
            'Uploading...'
        ): `Save Uploaded Image`}
        </Button>
      </form>
    </Form>
  )
}

export default ImageForm