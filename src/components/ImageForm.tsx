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
  console.log(userId)

  const form = useForm<z.infer<typeof imageFormSchema>>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: initialValues
  })
 

  async function onSubmit(values: z.infer<typeof imageFormSchema>) {
    let uploadedImageUrl = values.imageUrl;
    console.log(userId)

  
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
        router.push(`/`);
      }
    } catch (imageError) {
      console.error('Error creating image:', imageError);
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? (
            'Submitting...'
          ): `Image Upload`}</Button>
      </form>
    </Form>
  )
}

export default ImageForm