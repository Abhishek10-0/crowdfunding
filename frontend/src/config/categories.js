export const categories = [
  {
    name: "Technology",
    icon: "fas fa-microchip",
    subcategories: ["Software", "Hardware", "AI", "Blockchain"],
  },
  {
    name: "Healthcare",
    icon: "fas fa-heartbeat",
    subcategories: ["Medical Devices", "Biotech", "Digital Health"],
  },
  {
    name: "Finance",
    icon: "fas fa-chart-line",
    subcategories: ["Fintech", "Insurance", "Banking"],
  },
  {
    name: "Education",
    icon: "fas fa-graduation-cap",
    subcategories: ["EdTech", "Online Learning", "Schools"],
  },
  {
    name: "Environment",
    icon: "fas fa-leaf",
    subcategories: ["Clean Energy", "Recycling", "Sustainability"],
  },
  {
    name: "Food",
    icon: "fas fa-utensils",
    subcategories: ["FoodTech", "Agriculture", "Restaurants"],
  },
];

export const getAllCategories = () => {
  const allCategories = [];
  categories.forEach((category) => {
    allCategories.push(category.name);
    allCategories.push(...category.subcategories);
  });
  return allCategories;
};


export const getCategoryIcon = (categoryName) => {
  const category = categories.find(
    (cat) =>
      cat.name === categoryName || cat.subcategories.includes(categoryName)
  );
  return category ? category.icon : "fas fa-folder";
};
