import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const ImageUpload = ({ onImagesChange, currentImage }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    onImagesChange({
      images: selectedImages,
      thumbnail: selectedImages.length > 0 ? selectedImages[0].url : null
    });
}, [selectedImages]); 
useEffect(() => {
  if (currentImage) {
    if (selectedImages.length === 0 || selectedImages[0]?.url !== currentImage) {
      setSelectedImages([{ url: currentImage, name: 'Current Image' }]);
    }
  } else {
    if (selectedImages.length > 0) {
      setSelectedImages([]);
    }
  }
}, [currentImage]); 



  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024;
      return isValidType && isValidSize;
    });

    const newImages = validFiles.map(file => ({
      url: URL.createObjectURL(file),
      file: file,
      name: file.name
    }));

    const totalImages = [...selectedImages, ...newImages].slice(0, 6);
    setSelectedImages(totalImages);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
  
      // Clean up the URL object for the removed image
      URL.revokeObjectURL(prevImages[index].url);
  
      // Update parent component with empty state when no images remain
      if (updatedImages.length === 0) {
        onImagesChange({
          images: [],
          thumbnail: null, // Explicitly clear the thumbnail
        });
      }
  
      return updatedImages;
    });
  
    // Reset selectedImageIndex to avoid out-of-bounds errors
    setSelectedImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  

  useEffect(() => {
    return () => {
      selectedImages.forEach(image => {
        URL.revokeObjectURL(image.url);
      });
    };
  }, []);

  const MediaModal = () => (
    <div className="mediaModalOverlay">
      <div className="mediaModal">
        <div className="mediaModalHeader">
          <p className="modalCounter">
            {selectedImages.length > 0 ? `${selectedImageIndex + 1} OF ${selectedImages.length}` : 'Add Images'}
          </p>
          <button 
            onClick={() => setShowModal(false)} 
            className="closeButton"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mediaContent">
          <div className="mainPreview">
            {selectedImages.length > 0 ? (
              <img
                src={selectedImages[selectedImageIndex].url}
                alt={`Selected image ${selectedImageIndex + 1}`}
                className="mainPreviewImage"
              />
            ) : (
              <div className="emptyMainPreview">
                <label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hiddenInput"
                  />
                  <Plus size={48} color="#999" />
                </label>
              </div>
            )}
          </div>
          
          <div className="thumbnailGrid">
            {selectedImages.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnailContainer ${selectedImageIndex === index ? 'selected' : ''}`}
              >
                <img
                  src={image.url}
                  alt={`Preview ${index + 1}`}
                  className="thumbnailImage"
                  onClick={() => setSelectedImageIndex(index)}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                  className="removeButton"
                  aria-label={`Remove image ${index + 1}`}
                >
                  <Trash2 size={16} color="#ff4081" />
                </button>
              </div>
            ))}
            {selectedImages.length < 6 && (
              <label className="uploadPlaceholder">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hiddenInput"
                />
                <Plus size={24} color="#999" />
                <span>Add more</span>
              </label>
            )}
          </div>
        </div>

        <div className="modalActions">
          <button 
            onClick={() => setShowModal(false)} 
            className="primaryBtn2"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="imageUploadContainer">
      {selectedImages.length > 0 ? (
        <div className="imageGrid">
          {selectedImages.map((image, index) => (
            <div key={index} className="imageGridItem" onClick={() => setShowModal(true)}>
              <img
                src={image.url}
                alt={`Preview ${index + 1}`}
                className="thumbnailImage"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage(index);
                }}
                className="removeButton"
                aria-label={`Remove image ${index + 1}`}
              >
                <Trash2 size={16} color="#ff4081" />
              </button>
            </div>
          ))}
          {selectedImages.length < 6 && (
            <button
              onClick={() => setShowModal(true)}
              className="addImageButton"
              aria-label="Add more images"
            >
              <Plus size={24} color="#999" />
            </button>
          )}
        </div>
      ) : (
        <div
          className="imageUploadBox"
          onClick={() => setShowModal(true)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter') setShowModal(true);
          }}
        >
          <Plus size={24} color="#ff4081" />
        </div>
      )}
      
      {showModal && <MediaModal />}
    </div>
  );
};

export default ImageUpload;
