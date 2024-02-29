'use client'
import Image from 'next/image'
import { IImage } from '../lib/database/models/image.model'
import { DeleteConfirmation } from './DeleteConfirmation'

type ImageCollectionProps = {
  data: IImage[];
};

const ImageCollection = ({ data }: ImageCollectionProps) => {

  const openImageInNewTab = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Image URL copied to clipboard:', text);
    }).catch((error) => {
      console.error('Error copying to clipboard:', error);
    });
  };

  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="container flex text-black text-[26px] my-2">
          <div className="grid grid-cols-4 grid-flow-row gap-1 max-md:grid-cols-3 max-sm:grid-cols-2">
            {data.map((image) => (
              <div key={image._id} className='shadow-xl parent-container border-2 border-gray-300 hover:bg-gray-200 relative'>
                <div className='h-[327px] overflow-hidden relative flex justify-center'>
                  <Image src={image.imageUrl} width={327} height={327} alt="image" style={{ objectFit: "cover" }} />
                </div>
                <div className="icons-overlay absolute top-0 right-0 flex gap-3 p-2 bg-gray-200">
                  {/* Open image in new tab */}
                  <Image
                    onClick={() => openImageInNewTab(image.imageUrl)}
                    className='hover:cursor-pointer'
                    src='/link-solid.svg'
                    width={19}
                    height={16}
                    alt='image link'
                    title='Open in new tab'
                  />

                  {/* Copy image link to clipboard */}
                  <Image
                    onClick={() => copyToClipboard(image.imageUrl)}
                    className='hover:cursor-pointer'
                    src='/copy-solid.svg'
                    width={19}
                    height={16}
                    alt='copy image link'
                    title='Copy to clipboard'
                  />

                  {/* Delete image */}
                  <DeleteConfirmation imageId={image._id} />
                </div>
                <div className='absolute bottom-0 text-center text-[16px] p-2 text-black bg-gray-200 opacity-70'>
                  <p className='text-center text-[16px]'>Uploaded at {formatDate(image.uploadedAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container flex text-black text-[26px] my-2">
          <h1>No images to display</h1>
        </div>
      )}
    </>
  );
};

export default ImageCollection;