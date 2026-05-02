"use client";

import { useCallback, useEffect, useState } from "react";
import { optionType, typeProduct } from "../../types/productTypes";
import { createClient } from "@/app/utils/supabase/client";

interface Props {
  isAuth: boolean;
  userId: string;
}

const UseUserCart = ({ isAuth, userId }: Props) => {
  const [cartData, setCartData] = useState<typeProduct[]>([]);
  const [userCartLoading, setUserCartLoading] = useState(true);
  const [total, setTotal] = useState(0);

  /*
  1- make loop on cartGuest
  2- pass every option arr to function
  3- check by every if all options exist in dataDB options
  */

  const mergeUnique = useCallback(
    (data: typeProduct[], cartGuest: typeProduct[]) => {
      const map = new Map<string, typeProduct>();
      [...data, ...cartGuest].forEach((item) => {
        const optionsKey =
          item?.selected_options &&
          item?.selected_options
            .map(({ optionTitle, values }) => `${optionTitle}:${values}`)
            .sort()
            .join("-");
        const key = `${item.id}-${optionsKey}`;
        if (!map.has(key)) {
          map.set(key, item);
        }
      });
      const mapData = Array.from(map.values());
      return mapData;
    },
    [],
  );
  const insetDataIntoDB = useCallback(
    async ({
      dataSelect,
      getCartGuest,
    }: {
      dataSelect: typeProduct[];
      getCartGuest: typeProduct[];
    }) => {
      const supabase = createClient();
      const collectData = mergeUnique(dataSelect, getCartGuest);

      const normalize = (options: optionType[]) =>
        options
          ?.map((opt) => ({
            optionTitle: opt.optionTitle,
            values: opt.values,
          }))
          .sort((a, b) => a.optionTitle.localeCompare(b.optionTitle));

      const getNewData = collectData.filter((cartItem) => {
        return !dataSelect.some((dbItem) => {
          return (
            dbItem.id === cartItem.id &&
            JSON.stringify(normalize(dbItem.selected_options || [])) ===
              JSON.stringify(normalize(cartItem.selected_options || []))
          );
        });
      });

      const formatData = getNewData.map((item: typeProduct) => ({
        id: item.cartId,
        user_id: item.user_id,
        product_id: item.id,
        quantity: item.quantity,
        selected_options: item.selected_options,
      }));
      setCartData(collectData);
      const { error } = await supabase.from("user_cart").upsert(formatData, {
        onConflict: "user_id,product_id,selected_options",
      });
      if (error) throw error;
    },
    [mergeUnique],
  );

  useEffect(() => {
    const handleGuestCart = () => {
      const getItems = localStorage.getItem("cart_guest") || "[]";
      setCartData(JSON.parse(getItems));
      setUserCartLoading(false);
    };
    const handleUserCart = async () => {
      try {
        const supabase = createClient();
        setUserCartLoading(true);

        // Add user_id to each item in the guest cart
        const getCartGuest = JSON.parse(
          localStorage.getItem("cart_guest") || "[]",
        ).map(({ ...rest }: typeProduct) => ({
          ...rest,
          user_id: userId,
        }));
        const { data: dataSelect, error: selectError } = await supabase
          .from("user_cart")
          .select(
            `id, user_id, product_id, quantity, selected_options, products(*)`,
          )
          .eq("user_id", userId);
        if (selectError) throw selectError;

        // format data from DB to match the structure of the guest cart
        const formatDBData =
          dataSelect?.map((item) => {
            const product = Array.isArray(item.products)
              ? item.products[0]
              : item.products;
            return {
              cartId: item.id,
              id: item.product_id,
              name: product.name,
              img: product.img,
              description: product.description,
              imgGallery: product.imgGallery,
              rate: product.rate,
              stock: product.stock,
              user_id: item.user_id,
              quantity: item.quantity || 1,
              category_id: product.category_id,
              discount: product.discount,
              discount_type: product.discount_type,
              price: product.price,
              options: product.options,
              selected_options: item.selected_options,
              active: product.active,
              created_at: product.created_at,
              search_text: product.search_text,
            };
          }) || [];

        // insert data into DB without duplicates and merge with guest cart
        await insetDataIntoDB({ dataSelect: formatDBData, getCartGuest });

        // Clear guest cart after merging
        localStorage.removeItem("cart_guest");
      } catch (err) {
        console.error("Error syncing user cart:", err);
      } finally {
        setUserCartLoading(false);
      }
    };
    const syncCart = async () => {
      if (isAuth && !userId) return;
      if (!userId) {
        handleGuestCart();
      } else {
        await handleUserCart();
      }
    };
    syncCart();
  }, [isAuth, userId, insetDataIntoDB]);

  useEffect(() => {
    const getTotal = cartData.reduce((acc, curr) => {
      let price = curr.price;

      if (curr.discount && curr.discount_type) {
        if (curr.discount_type === "fixed") {
          price -= curr.discount;
        } else if (curr.discount_type === "percentage") {
          price -= (curr.discount / 100) * price;
        }
      }
      return acc + (curr.quantity || 1) * price;
    }, 0);

    setTotal(getTotal);
  }, [cartData]);

  return { cartData, userCartLoading, total, setCartData };
};

export default UseUserCart;
