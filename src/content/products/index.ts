import type { Product } from "@/lib/validation/product";
import aurum from "./aurum";
import kontor from "./kontor";
import nordlicht from "./nordlicht";
import gazette from "./gazette";
import lumen from "./lumen";
import formwerk from "./formwerk";
import tempo from "./tempo";
import gridwerk from "./gridwerk";

/**
 * To add a product: create `src/content/products/<slug>.ts` with
 * `defineProduct({...})`, generate its screenshots with `npm run images`
 * (or drop real screenshots into public/images/products/<slug>/), then add it here.
 */
export const products: Product[] = [aurum, kontor, nordlicht, gazette, lumen, formwerk, tempo, gridwerk].sort(
  (a, b) => a.order - b.order,
);
