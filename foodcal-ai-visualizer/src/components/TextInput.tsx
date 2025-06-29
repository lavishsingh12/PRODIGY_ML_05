
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageSquare, Loader2, Sparkles } from 'lucide-react';

interface TextInputProps {
  onTextAnalysis: (text: string) => void;
  isAnalyzing: boolean;
}

const TextInput = ({ onTextAnalysis, isAnalyzing }: TextInputProps) => {
  const [foodText, setFoodText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (foodText.trim()) {
      onTextAnalysis(foodText.trim());
    }
  };

  const sampleTexts = [
    "Grilled chicken breast with quinoa and vegetables",
    "Large pepperoni pizza slice",
    "Greek yogurt with berries and granola",
    "Avocado toast with scrambled eggs"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Describe Your Food
          </h3>
          <p className="text-sm text-gray-500">
            Tell us what you're eating and our AI will calculate the nutrition
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            value={foodText}
            onChange={(e) => setFoodText(e.target.value)}
            placeholder="e.g., Grilled salmon with rice and broccoli"
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Sparkles className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={!foodText.trim() || isAnalyzing}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105 transform"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <MessageSquare className="w-5 h-5 mr-2" />
              Analyze Food
            </>
          )}
        </Button>
      </form>

      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-600 text-center">Try these examples:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sampleTexts.map((text, index) => (
            <Card
              key={index}
              className="p-3 cursor-pointer hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 transition-all duration-200 hover:scale-105 transform border-gray-200 hover:border-emerald-300"
              onClick={() => setFoodText(text)}
            >
              <p className="text-sm text-gray-600 hover:text-emerald-700 transition-colors duration-200">
                {text}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
