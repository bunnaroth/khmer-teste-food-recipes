import type { DishCategory } from "@/types/dish";

export const categories = [
  {
    id: "noodles",
    name: "Noodles",
    khmerName: "គុយទាវ",
    description: "Noodle dishes and broths to share.",
  },
  {
    id: "rice",
    name: "Rice dishes",
    khmerName: "បាយ",
    description: "Rice at the centre of the meal.",
  },
  {
    id: "soups",
    name: "Soups",
    khmerName: "សម្ល",
    description: "Comforting bowls, bright with herbs and flavour.",
  },
  {
    id: "curries",
    name: "Curries",
    khmerName: "ការី",
    description: "Fragrant curries, pastes, and slow-simmered flavours.",
  },
  {
    id: "desserts",
    name: "Desserts",
    khmerName: "បង្អែម",
    description: "Sweet treats and banana-leaf parcels.",
  },
] satisfies DishCategory[];
