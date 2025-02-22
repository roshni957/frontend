import React, { useState } from 'react';
import { Search, MapPin, Star, Filter, Clock } from 'lucide-react';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  priceForTwo: string;
  image: string;
  location: string;
}

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "The Spice Garden",
    cuisine: "Indian, Chinese",
    rating: 4.2,
    deliveryTime: "30-35",
    priceForTwo: "₹600",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
    location: "Downtown"
  },
  {
    id: 2,
    name: "Pizza Paradise",
    cuisine: "Italian, Pizza",
    rating: 4.5,
    deliveryTime: "25-30",
    priceForTwo: "₹800",
    image: "https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=500&q=80",
    location: "Westside"
  },
  {
    id: 3,
    name: "Sushi Express",
    cuisine: "Japanese, Sushi",
    rating: 4.3,
    deliveryTime: "35-40",
    priceForTwo: "₹1200",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80",
    location: "Eastside"
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === "All" || restaurant.cuisine.includes(selectedCuisine);
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-red-500">Zomato Clone</h1>
            <div className="flex items-center space-x-2">
              <MapPin className="text-gray-400" size={20} />
              <span className="text-gray-700">Current Location</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for restaurants or cuisines"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
          >
            <option value="All">All Cuisines</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                  <div className="flex items-center bg-green-100 px-2 py-1 rounded">
                    <span className="text-green-700 font-medium">{restaurant.rating}</span>
                    <Star className="ml-1 text-green-700" size={16} fill="currentColor" />
                  </div>
                </div>
                <p className="text-gray-600 mt-1">{restaurant.cuisine}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{restaurant.deliveryTime} mins</span>
                  </div>
                  <span>{restaurant.priceForTwo} for two</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPin size={16} className="mr-1" />
                  <span>{restaurant.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;