
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Github, Linkedin, Code, Brain, Sparkles, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Get in Touch
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-center text-gray-600">
            Let's discuss AI, machine learning, or potential collaborations
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Section */}
          <Card className="p-6 bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Lavish Singh Rajawat
                </h3>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                    <Brain className="w-4 h-4 mr-1" />
                    AI & ML Engineer
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200">
                    <Sparkles className="w-4 h-4 mr-1" />
                    AI Expert
                  </Badge>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                Passionate about creating intelligent solutions that make technology more accessible and impactful. 
                I specialize in developing AI-powered applications that solve real-world problems.
              </p>
            </div>
          </Card>

          {/* Skills & Expertise */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">AI & Machine Learning</h4>
                  <p className="text-sm text-blue-600">Deep Learning, Computer Vision, NLP</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800">Core Technologies</h4>
                  <p className="text-sm text-purple-600">Python, C, SQL, DSA, Web3</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="p-6 bg-white border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-4 text-center">Let's Connect</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="border-gray-800 text-gray-800 hover:bg-gray-50 py-3 rounded-xl transition-all duration-300 hover:scale-105 transform"
                onClick={() => window.open('https://github.com/lavishsingh12', '_blank')}
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
              
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl transition-all duration-300 hover:scale-105 transform"
                onClick={() => window.open('https://www.linkedin.com/in/lavishsingh12', '_blank')}
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
            </div>
          </Card>

          {/* Project Info */}
          <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200">
            <p className="text-sm text-gray-600">
              <span className="font-medium">FoodCal AI</span> - Revolutionizing nutrition tracking through artificial intelligence
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;