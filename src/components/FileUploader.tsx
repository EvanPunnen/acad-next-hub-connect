
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, File, X, Camera, Image } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  allowCamera?: boolean;
  label?: string;
}

const FileUploader = ({
  onFileSelect,
  acceptedTypes = ".pdf,.jpg,.jpeg,.png,.doc,.docx",
  maxSize = 5,
  allowCamera = true,
  label = "Choose File"
}: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setError('');
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      setError('Invalid file type. Please select a supported file.');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">{label}</Label>
      
      {/* Hidden file inputs */}
      <Input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {allowCamera && (
        <Input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      )}

      {/* File drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
        }`}
      >
        {selectedFile ? (
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <File className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Drag and drop your file here, or click to browse
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={openFileDialog}
                >
                  <File className="h-4 w-4 mr-2" />
                  Browse Files
                </Button>
                {allowCamera && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={openCamera}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* File type info */}
      <p className="text-xs text-gray-500">
        Supported formats: {acceptedTypes.replace(/\./g, '').toUpperCase()} • Max size: {maxSize}MB
      </p>

      {error && (
        <Alert className="border-red-200 bg-red-50 text-red-800">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FileUploader;
