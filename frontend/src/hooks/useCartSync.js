import { useEffect } from 'react';
import API_URL from '../config/api';

export function useCartSync(items, removeItem) {
  useEffect(() => {
    if (!items || items.length === 0) return;

    const checkProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) return;

        const serverProducts = await res.json();
        const serverIds = new Set(serverProducts.map((p) => p.id));

        items.forEach((item) => {
          if (!serverIds.has(item.id)) {
            removeItem(item.id);
          }
        });
      } catch {
      }
    };

    checkProducts();
  }, []);
}
