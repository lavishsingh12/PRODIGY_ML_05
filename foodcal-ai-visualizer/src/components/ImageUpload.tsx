import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Image, Camera, X, Sparkles, Brain, Zap, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ImageUploadProps {
  onImageAnalysis: (file: File) => void;
  isAnalyzing: boolean;
}

const ImageUpload = ({ onImageAnalysis, isAnalyzing }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
      setAnalysisComplete(false);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onImageAnalysis(selectedFile);
      setTimeout(() => {
        setAnalysisComplete(true);
      }, 3000);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setAnalysisComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Analysis in progress view - Keep dashed border visible with overlay covering almost the area
  if (isAnalyzing && selectedImage) {
    return (
      <div className="space-y-6">
        <div className="relative">
          {/* Food image with dashed border kept visible and horizontal overlay covering almost the area */}
          <div className="relative rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-50 p-4">
            <img
              src={selectedImage}
              alt="Analyzing food"
              className="w-full h-64 object-cover rounded-lg"
            />
            
            {/* Horizontal overlay covering almost the entire area but leaving dashed border visible */}
            <div className="absolute inset-6 bg-black/70 flex items-center justify-center rounded-lg">
              <div className="text-center text-white space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto">
                    <Sparkles className="w-16 h-16 text-white animate-spin opacity-80" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold">Analyzing your food...</h3>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis progress steps */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-emerald-50 border-2 border-purple-200">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 text-base text-gray-700 bg-white/60 backdrop-blur-sm rounded-lg p-3">
              <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
              <span>Processing image with computer vision</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-base text-gray-700 bg-white/60 backdrop-blur-sm rounded-lg p-3">
              <Brain className="w-5 h-5 text-blue-500 animate-pulse" />
              <span>Identifying ingredients and portions</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-base text-gray-700 bg-white/60 backdrop-blur-sm rounded-lg p-3">
              <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
              <span>Calculating nutritional values</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div className="bg-gradient-to-r from-purple-600 to-emerald-600 h-3 rounded-full animate-pulse" style={{width: '75%'}}></div>
          </div>
        </Card>
      </div>
    );
  }

  // Analysis complete view - Clean image display
  if (analysisComplete && selectedImage) {
    return (
      <div className="space-y-6">
        {/* Analysis Complete Message */}
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sparkles className="w-6 h-6 text-emerald-600 animate-pulse" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Analysis complete! Here's what we found 🍽️
              </h3>
              <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
            </div>
            <p className="text-gray-600">Your food has been successfully analyzed with AI precision</p>
          </div>
        </Card>

        {/* Clean Image Display */}
        <div className="relative inline-block mx-auto">
          <img
            src={selectedImage}
            alt="Analyzed food"
            className="max-w-full max-h-64 rounded-lg shadow-lg mx-auto block"
          />
          <Button
            onClick={clearImage}
            size="sm"
            variant="destructive"
            className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Initial upload view
  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          dragActive
            ? 'border-emerald-400 bg-emerald-50'
            : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'
        } ${selectedImage ? 'border-emerald-400 bg-emerald-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        {selectedImage ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img
                src={selectedImage}
                alt="Selected food"
                className="max-w-full max-h-64 rounded-lg shadow-lg"
              />
              <Button
                onClick={clearImage}
                size="sm"
                variant="destructive"
                className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              {selectedFile?.name} • {((selectedFile?.size || 0) / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <div className="animate-bounce-gentle">
                <Upload className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drop your food image here or click to upload
              </p>
              <p className="text-sm text-gray-500">
                Supports JPG, PNG, GIF up to 10MB
              </p>
            </div>
          </div>
        )}
        
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          >
            <Image className="w-4 h-4 mr-2" />
            Choose File
          </Button>
          
          <Button
            onClick={() => {
              fileInputRef.current?.click();
            }}
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <Camera className="w-4 h-4 mr-2" />
            Take Photo
          </Button>
        </div>
      </div>
      
      {selectedFile && !isAnalyzing && !analysisComplete && (
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Ready for Analysis</p>
                <p className="text-sm text-gray-600">AI will analyze your food image</p>
              </div>
            </div>
            
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
            >
              <Camera className="w-4 h-4 mr-2" />
              Analyze Food
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;