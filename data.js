import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin Trung Dung",
    email: "trungdungdev.203@gmail.com",
    password: bcrypt.hashSync("Trungdung.203", 20),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

const products = [
  {
    name: "Airpods Wireless Bluetooth Headphones",
    image: "/images/airpods.jpg",
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly.",
    brand: "Apple",
    category: "Electronics",
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "iPhone 13 Pro 256GB Memory",
    image: "/images/phone.jpg",
    description:
      "Introducing the iPhone 13 Pro. A dramatically more powerful camera system.",
    brand: "Apple",
    category: "Electronics",
    price: 999.99,
    countInStock: 7,
    rating: 4.7,
    numReviews: 8,
  },
  {
    name: "Sony Playstation 5",
    image: "/images/playstation.jpg",
    description: "The ultimate PlayStation 5 gaming experience.",
    brand: "Sony",
    category: "Electronics",
    price: 499.99,
    countInStock: 5,
    rating: 4.8,
    numReviews: 20,
  },
];

export { users, products };
