import type { Request, Response } from "express";
import { CartService } from "../service/cart.service.js";

export const addToCart = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  const { productId, quantity, variantId } = req.body;
  try {
    if (!productId || !variantId || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid productId, quantiy or variantId" });
    }

    const result = await CartService.addCart({
      userId,
      productId,
      variantId,
      quantity,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Add to cart failed" });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  const { id: variantId } = req.params;

  try {
    if (!variantId || !userId) {
      return res.status(400).json({ message: "Invalid variantId or userId" });
    }

    const deletedCount = await CartService.removeItemInCart(userId, variantId);

    if (deletedCount === 1) {
      return res
        .status(200)
        .json({ message: "Deleted successfully", variantId });
    }
    return res.status(404).json({ message: "Item not found in cart" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Remove from cart failed" });
  }
};

export const getAllProductsFromCart = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  try {
    const cart = await CartService.getAllFromCart(userId);
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Get cart failed" });
  }
};
