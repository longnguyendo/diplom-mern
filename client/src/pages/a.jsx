import React from 'react'

const a = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="cursor-pointer">
          <span className="sr-only">Choose images</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple={multiple}
            className="hidden"
          />
          <Button color="gray" outline>
            <HiOutlinePhotograph className="w-5 h-5 mr-2" />
            {multiple ? 'Add Images' : 'Add Image'}
          </Button>
        </label>
        
        {previewUrls.length > 0 && (
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            gradientDuoTone="purpleToBlue"
          >
            {isUploading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Uploading...</span>
              </>
            ) : (
              'Upload Images'
            )}
          </Button>
        )}
      </div>

      {error && (
        <Alert color="failure">
          {error}
        </Alert>
      )}

      <div className="flex flex-wrap gap-4">
        {previewUrls.map((item, index) => (
          <div key={index} className="relative group">
            <img
              src={item.preview}
              alt={`Preview ${index}`}
              className="object-cover w-32 h-32 rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
            >
              <HiOutlineTrash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default a