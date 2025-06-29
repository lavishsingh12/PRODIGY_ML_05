
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Wheat, Dumbbell, Droplets, Leaf, Candy, Sparkles, Target, TrendingUp, Star } from 'lucide-react';

interface NutritionData {
  foodName: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  sugar: number;
}

interface NutritionDisplayProps {
  data: NutritionData;
}

const NutritionDisplay = ({ data }: NutritionDisplayProps) => {
  const nutrients = [
    {
      name: 'Calories',
      value: data.calories,
      unit: 'kcal',
      icon: Flame,
      color: 'from-red-500 to-orange-500',
      bgColor: 'from-red-50 to-orange-50',
      textColor: 'text-red-700'
    },
    {
      name: 'Carbohydrates',
      value: data.carbs,
      unit: 'g',
      icon: Wheat,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'from-yellow-50 to-amber-50',
      textColor: 'text-yellow-700'
    },
    {
      name: 'Protein',
      value: data.protein,
      unit: 'g',
      icon: Dumbbell,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      textColor: 'text-blue-700'
    },
    {
      name: 'Fat',
      value: data.fat,
      unit: 'g',
      icon: Droplets,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      textColor: 'text-purple-700'
    },
    {
      name: 'Fiber',
      value: data.fiber,
      unit: 'g',
      icon: Leaf,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      textColor: 'text-green-700'
    },
    {
      name: 'Sugar',
      value: data.sugar,
      unit: 'g',
      icon: Candy,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
      textColor: 'text-pink-700'
    }
  ];

  const getSmartServingSuggestions = () => {
    const foodName = data.foodName.toLowerCase();
    
    if (foodName.includes('salad') || foodName.includes('vegetable') || foodName.includes('green')) {
      return {
        general: "This nutrient-dense option is excellent for overall health. Consider adding 1-2 more servings to boost fiber intake and enhance satiety while maintaining your wellness goals.",
        specific: [
          "For cutting: Perfect base - add lean protein like grilled chicken",
          "For bulking: Add healthy fats like avocado, nuts, or olive oil drizzle", 
          "For maintenance: Ideal portion - pair with complex carbs for balance"
        ]
      };
    } else if (foodName.includes('pizza') || foodName.includes('burger')) {
      return {
        general: "This calorie-dense food can fit into your goals with smart portioning. Consider reducing to 0.5-0.75 servings and adding nutrient-dense sides.",
        specific: [
          "For cutting: Limit to half portion, add large side salad",
          "For bulking: Full serving is fine, add protein shake or Greek yogurt",
          "For maintenance: 0.75 serving with vegetables works well"
        ]
      };
    } else if (foodName.includes('chicken') || foodName.includes('protein')) {
      return {
        general: "Excellent protein choice for muscle maintenance and growth. This serving size works well, though you might adjust based on your specific protein targets.",
        specific: [
          "For cutting: Perfect amount - high protein, low calories",
          "For bulking: Consider 1.5x serving size for higher protein intake",
          "For maintenance: Ideal portion - pair with carbs and vegetables"
        ]
      };
    } else if (foodName.includes('fruit') || foodName.includes('apple')) {
      return {
        general: "Natural source of vitamins and energy. You can safely have 1-2 more servings as snacks throughout the day, timing them around your activity levels.",
        specific: [
          "For cutting: Great low-calorie snack - have 1-2 more servings",
          "For bulking: Add nut butter or nuts for healthy calories",
          "For maintenance: Perfect as-is for natural energy"
        ]
      };
    } else {
      return {
        general: "Based on the nutritional profile, this portion appears well-balanced. Adjust by ±0.5 servings based on your daily targets and hunger levels.",
        specific: [
          "For cutting: Monitor portion size, pair with low-calorie vegetables",
          "For bulking: Increase by 0.5-1 serving or add calorie-dense sides",
          "For maintenance: Current portion looks optimal"
        ]
      };
    }
  };

  const servingSuggestions = getSmartServingSuggestions();

  return (
    <div className="space-y-6">
      {/* 1. First: Nutritional Items Display */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Badge className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-1">
              ✨ AI Analysis Complete
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            {data.foodName}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {nutrients.map((nutrient, index) => {
              const IconComponent = nutrient.icon;
              return (
                <div
                  key={nutrient.name}
                  className={`p-4 rounded-xl bg-gradient-to-br ${nutrient.bgColor} border border-gray-100 hover:scale-105 transform transition-all duration-300 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${nutrient.color} flex items-center justify-center`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${nutrient.textColor} mb-1`}>
                    {nutrient.value}
                    <span className="text-sm font-normal ml-1">{nutrient.unit}</span>
                  </div>
                  <div className={`text-sm font-medium ${nutrient.textColor} opacity-80`}>
                    {nutrient.name}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 2. Second: Enhanced Smart Serving Suggestions */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-2 border-gradient-to-r from-purple-200 to-pink-200 shadow-xl hover:shadow-2xl transition-all duration-500">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-30 -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100 to-yellow-100 rounded-full opacity-40 translate-y-12 -translate-x-12"></div>
        
        <div className="relative p-8 space-y-6">
          {/* Header with enhanced styling */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Star className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Smart Serving Guide
              </h4>
              <p className="text-sm text-gray-600 font-medium">AI-Powered Nutrition Recommendations</p>
            </div>
          </div>
          
          {/* Main content with enhanced styling */}
          <div className="relative p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-inner">
            <div className="absolute top-2 right-2">
              <TrendingUp className="w-5 h-5 text-purple-400 opacity-60" />
            </div>
            
            <p className="text-gray-800 mb-4 font-medium text-lg leading-relaxed">
              {servingSuggestions.general}
            </p>
            
            <div className="space-y-3">
              {servingSuggestions.specific.map((suggestion, index) => (
                <div key={index} className="group flex items-start space-x-3 p-3 rounded-xl bg-gradient-to-r from-white/60 to-purple-50/60 hover:from-white/80 hover:to-purple-50/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm"></div>
                  <p className="text-gray-700 font-medium group-hover:text-gray-800 transition-colors duration-300">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom accent */}
          <div className="flex items-center justify-center space-x-2 pt-2">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" style={{animationDelay: `${i * 200}ms`}}></div>
              ))}
            </div>
            <span className="text-xs text-gray-500 font-medium">Personalized for your goals</span>
          </div>
        </div>
      </Card>

      {/* 3. Third: Nutritional Insights */}
      <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600 mb-2">
            🎯 Nutritional Insights
          </p>
          <p className="text-sm text-gray-700">
            This analysis is based on AI recognition and standard nutritional databases. 
            Values may vary based on preparation methods and portion sizes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NutritionDisplay;