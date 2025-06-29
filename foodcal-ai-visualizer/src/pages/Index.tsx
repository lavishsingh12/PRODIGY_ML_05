import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Type, BarChart3, Mail, Image, MessageSquare, Activity, Play, Utensils, Sparkles } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload";
import TextInput from "@/components/TextInput";
import NutritionDisplay from "@/components/NutritionDisplay";
import ContactModal from "@/components/ContactModal";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload');
  const [nutritionData, setNutritionData] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getNutritionByFoodName = (name: string) => {
    const data: Record<string, any> = {
      burger: { calories: 295, carbs: 30, protein: 17, fat: 14, fiber: 3, sugar: 5 },
      butter_naan: { calories: 320, carbs: 42, protein: 6, fat: 14, fiber: 2, sugar: 2 },
      chai: { calories: 120, carbs: 15, protein: 3, fat: 5, fiber: 0, sugar: 12 },
      chapati: { calories: 104, carbs: 18, protein: 3, fat: 2, fiber: 2, sugar: 1 },
      chole_bhature: { calories: 427, carbs: 45, protein: 10, fat: 22, fiber: 5, sugar: 3 },
      dal_makhani: { calories: 210, carbs: 25, protein: 10, fat: 8, fiber: 7, sugar: 2 },
      dhokla: { calories: 160, carbs: 25, protein: 6, fat: 6, fiber: 1, sugar: 2 },
      idli: { calories: 58, carbs: 12, protein: 2, fat: 0.4, fiber: 1, sugar: 0 },
      jalebi: { calories: 150, carbs: 30, protein: 1, fat: 5, fiber: 0, sugar: 25 },
      kadai_paneer: { calories: 280, carbs: 15, protein: 12, fat: 20, fiber: 2, sugar: 4 },
      masala_dosa: { calories: 232, carbs: 35, protein: 6, fat: 10, fiber: 3, sugar: 1 },
      paani_puri: { calories: 150, carbs: 22, protein: 2, fat: 6, fiber: 1, sugar: 2 },
      pav_bhaji: { calories: 400, carbs: 50, protein: 8, fat: 18, fiber: 6, sugar: 3 },
      pizza: { calories: 266, carbs: 33, protein: 11, fat: 10, fiber: 2, sugar: 4 },
      samosa: { calories: 262, carbs: 32, protein: 5, fat: 13, fiber: 2, sugar: 1 },
      salad: { calories: 65, carbs: 11, protein: 5, fat: 0.3, fiber: 4, sugar: 6 },
      chicken: { calories: 165, carbs: 0, protein: 31, fat: 3.6, fiber: 0, sugar: 0 }
    };

    return data[name.toLowerCase()] || {
      calories: 200, carbs: 20, protein: 10, fat: 10, fiber: 2, sugar: 5
    };
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageAnalysis = async (file: File) => {
    setIsAnalyzing(true);
    toast.success("🔍 AI is analyzing your food image...", {
      description: "Processing with advanced computer vision",
      duration: 3000,
    });

    try {
      const base64 = await convertToBase64(file);

      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64.split(',')[1] })
      });

      const raw = await response.json();
      let parsed;
      try {
        parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      } catch {
        parsed = raw;
      }

      // 🔁 FIX 2: Make sure string passed to getNutrition is lowercase-safe
      const nutritionData = {
        foodName: parsed.food || "Unknown",
        calories: parsed.calories,
        carbs: parsed.carbs,
        protein: parsed.protein,
        fat: parsed.fat,
        fiber: parsed.fiber,
        sugar: parsed.sugar
      };

      setNutritionData(nutritionData);
      setIsAnalyzing(false);
      toast.success("✨ Analysis Complete!", {
        description: `Identified as ${nutritionData.foodName}`,
        duration: 2000,
      });

    } catch (error) {
      console.error("Prediction error:", error);
      setIsAnalyzing(false);
      toast.error("❌ Failed to analyze image. Please try again.");
    }
  };

  const handleTextAnalysis = async (text: string) => {
    setIsAnalyzing(true);
    toast.success("🧠 AI is processing your food description...", {
      description: "Understanding your meal details",
      duration: 3000,
    });

    try {
      const nutritionData = getNutritionByFoodName(text);
      setTimeout(() => {
        setNutritionData({ foodName: text, ...nutritionData });
        setIsAnalyzing(false);
        toast.success("✨ Analysis Complete!", {
          description: "Your food nutrition has been calculated",
          duration: 2000,
        });
      }, 3000);
    } catch (error) {
      setIsAnalyzing(false);
      toast.error("Something went wrong during analysis.");
    }
  };

  const analyzeTextForNutrition = async (foodText: string) => {
    const lowerText = foodText.toLowerCase();

    // Basic nutrition database for common foods
    const nutritionDatabase = {
      // Proteins
      'chicken': { calories: 165, carbs: 0, protein: 31, fat: 3.6, fiber: 0, sugar: 0 },
      'salmon': { calories: 208, carbs: 0, protein: 22, fat: 12, fiber: 0, sugar: 0 },
      'egg': { calories: 155, carbs: 1.1, protein: 13, fat: 11, fiber: 0, sugar: 1.1 },
      'beef': { calories: 250, carbs: 0, protein: 26, fat: 15, fiber: 0, sugar: 0 },

      // Carbs
      'rice': { calories: 130, carbs: 28, protein: 2.7, fat: 0.3, fiber: 0.4, sugar: 0.1 },
      'pasta': { calories: 220, carbs: 44, protein: 8, fat: 1.3, fiber: 2.5, sugar: 1.0 },
      'bread': { calories: 265, carbs: 49, protein: 9, fat: 3.2, fiber: 2.7, sugar: 5.7 },
      'potato': { calories: 161, carbs: 37, protein: 4.3, fat: 0.2, fiber: 2.2, sugar: 1.7 },
      'quinoa': { calories: 222, carbs: 39, protein: 8, fat: 3.6, fiber: 5.2, sugar: 1.6 },

      // Vegetables
      'broccoli': { calories: 34, carbs: 7, protein: 2.8, fat: 0.4, fiber: 2.6, sugar: 1.5 },
      'spinach': { calories: 23, carbs: 3.6, protein: 2.9, fat: 0.4, fiber: 2.2, sugar: 0.4 },
      'carrot': { calories: 41, carbs: 10, protein: 0.9, fat: 0.2, fiber: 2.8, sugar: 4.7 },
      'tomato': { calories: 18, carbs: 3.9, protein: 0.9, fat: 0.2, fiber: 1.2, sugar: 2.6 },

      // Fruits
      'apple': { calories: 52, carbs: 14, protein: 0.3, fat: 0.2, fiber: 2.4, sugar: 10 },
      'banana': { calories: 89, carbs: 23, protein: 1.1, fat: 0.3, fiber: 2.6, sugar: 12 },
      'orange': { calories: 47, carbs: 12, protein: 0.9, fat: 0.1, fiber: 2.4, sugar: 9.4 },

      // Popular dishes
      'pizza': { calories: 285, carbs: 36, protein: 12, fat: 10, fiber: 2.3, sugar: 3.8 },
      'burger': { calories: 540, carbs: 40, protein: 25, fat: 31, fiber: 3, sugar: 5 },
      'salad': { calories: 65, carbs: 11, protein: 5, fat: 0.3, fiber: 4, sugar: 6 },
      'sandwich': { calories: 300, carbs: 33, protein: 15, fat: 12, fiber: 4, sugar: 4 }
    };

    let totalNutrition = { calories: 0, carbs: 0, protein: 0, fat: 0, fiber: 0, sugar: 0 };
    let foundIngredients = [];

    // Check for each ingredient in the database
    for (const [ingredient, nutrition] of Object.entries(nutritionDatabase)) {
      if (lowerText.includes(ingredient)) {
        foundIngredients.push(ingredient);
        // Add nutrition values
        totalNutrition.calories += nutrition.calories;
        totalNutrition.carbs += nutrition.carbs;
        totalNutrition.protein += nutrition.protein;
        totalNutrition.fat += nutrition.fat;
        totalNutrition.fiber += nutrition.fiber;
        totalNutrition.sugar += nutrition.sugar;
      }
    }

    // If no ingredients found, provide estimate based on meal type
    if (foundIngredients.length === 0) {
      if (lowerText.includes('breakfast')) {
        totalNutrition = { calories: 350, carbs: 45, protein: 15, fat: 12, fiber: 5, sugar: 8 };
      } else if (lowerText.includes('lunch')) {
        totalNutrition = { calories: 450, carbs: 50, protein: 25, fat: 15, fiber: 8, sugar: 10 };
      } else if (lowerText.includes('dinner')) {
        totalNutrition = { calories: 550, carbs: 40, protein: 35, fat: 20, fiber: 10, sugar: 8 };
      } else {
        totalNutrition = { calories: 300, carbs: 35, protein: 20, fat: 10, fiber: 5, sugar: 8 };
      }
    }

    // Adjust portions based on descriptive words
    let portionMultiplier = 1;
    if (lowerText.includes('large') || lowerText.includes('big')) portionMultiplier = 1.5;
    if (lowerText.includes('small') || lowerText.includes('mini')) portionMultiplier = 0.7;
    if (lowerText.includes('extra large') || lowerText.includes('jumbo')) portionMultiplier = 2;

    // Apply portion multiplier
    Object.keys(totalNutrition).forEach(key => {
      totalNutrition[key] = Math.round(totalNutrition[key] * portionMultiplier);
    });

    return {
      foodName: foodText,
      ...totalNutrition
    };
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-emerald-100 z-50 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 group">
              <div className="relative w-8 h-8 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Utensils className="w-5 h-5 text-white animate-logo-bounce" />
              </div>
              <span className="text-xl font-bold">
                <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Food</span>
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">Cal</span>
                <span className="bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 bg-clip-text text-transparent"> AI</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium hover:scale-105 transform">
                Home
              </button>
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium hover:scale-105 transform">
                Features
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium hover:scale-105 transform">
                About
              </button>
              <Button onClick={() => setShowContact(true)} className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-all duration-300 animate-fade-in">
              ✨ Powered by Advanced AI Technology
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
              <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Food
              </span>
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                Cal
              </span>
              <span className="bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 bg-clip-text text-transparent">
                {" "}AI
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light animate-fade-in">
              Smart AI to track your food & stay healthy
            </p>

            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Revolutionary AI technology that instantly analyzes your food photos or descriptions to provide accurate nutritional information, helping you make informed dietary choices effortlessly.
            </p>

            {/* Interactive Food Analysis Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-emerald-200 transition-all duration-500 transform hover:scale-105 animate-fade-in">
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTab('upload')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'upload'
                        ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-emerald-600'
                      }`}
                  >
                    <Image className="w-5 h-5 inline mr-2" />
                    Upload Image
                  </button>
                  <button
                    onClick={() => setActiveTab('text')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'text'
                        ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-emerald-600'
                      }`}
                  >
                    <MessageSquare className="w-5 h-5 inline mr-2" />
                    Text Input
                  </button>
                </div>
              </div>

              {activeTab === 'upload' ? (
                <ImageUpload onImageAnalysis={handleImageAnalysis} isAnalyzing={isAnalyzing} />
              ) : (
                <TextInput onTextAnalysis={handleTextAnalysis} isAnalyzing={isAnalyzing} />
              )}

              {nutritionData && (
                <div className="mt-8 animate-fade-in">
                  <NutritionDisplay data={nutritionData} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 animate-fade-in">
              🚀 Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in">
              Advanced AI capabilities designed to revolutionize how you track and understand your nutrition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 hover:scale-105 transform animate-fade-in">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-emerald-800">Image Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-emerald-700 leading-relaxed">
                  Simply snap a photo of your meal and our AI instantly identifies ingredients and calculates precise nutritional values with advanced computer vision.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:scale-105 transform animate-fade-in">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Type className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-blue-800">Text-Based Input</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-blue-700 leading-relaxed">
                  Describe your meal in natural language and watch our AI parse ingredients, portions, and cooking methods for accurate nutrition analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:scale-105 transform animate-fade-in">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-purple-800">Nutrition Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-purple-700 leading-relaxed">
                  Get detailed macronutrient profiles including calories, carbs, proteins, fats, vitamins, and minerals with interactive visual charts.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-6 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-800 border-0">
                🌟 Our Vision
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Revolutionizing Nutrition Awareness
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                FoodCal AI represents the next generation of nutrition technology, combining cutting-edge artificial intelligence with intuitive design to make healthy eating accessible to everyone.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our mission is to eliminate the guesswork from nutrition tracking, empowering users to make informed dietary choices through intelligent, accurate, and effortless food analysis.
              </p>

              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-2xl border border-emerald-100">
                <p className="text-gray-700 font-medium mb-2">Created by</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Lavish Singh Rajawat
                </p>
                <p className="text-gray-600 mt-2">AI & ML Engineer</p>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="bg-gradient-to-br from-emerald-100 via-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <Activity className="w-12 h-12 mx-auto text-emerald-600 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Transforming Lives Through AI</h3>
                    <p className="text-gray-600">Making nutrition accessible, accurate, and actionable for everyone on their health journey.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-emerald-50 rounded-xl">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">Advanced</div>
                      <div className="text-sm text-emerald-700 font-medium">AI Models</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600 mb-1">Instant</div>
                      <div className="text-sm text-blue-700 font-medium">Analysis</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600 mb-1">Personalized</div>
                      <div className="text-sm text-purple-700 font-medium">Insights</div>
                    </div>
                    <div className="text-center p-4 bg-pink-50 rounded-xl">
                      <div className="text-2xl font-bold text-pink-600 mb-1">Real-time</div>
                      <div className="text-sm text-pink-700 font-medium">Tracking</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-900 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold">FoodCal AI</span>
          </div>
          <p className="text-emerald-200 mb-6">Smart AI to track your food & stay healthy</p>
          <div className="border-t border-emerald-800 pt-6">
            <p className="text-emerald-300">© 2024 FoodCal AI. Crafted with ❤️ by Lavish Singh Rajawat</p>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
};

export default Index;