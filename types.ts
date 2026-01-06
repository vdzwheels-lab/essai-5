export interface WheelProduct {
  id: string;
  name: string;
  depth: string;
  price: string;
  image: string;
  features: string[];
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
