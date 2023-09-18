import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import useSetBrandStore from "@/hooks/useSetBrand";

export const BrandDetailsModal = ({ isOpen, onClose, onOpen }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { brand } = useSetBrandStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!brand) return null;

  return (
    <Modal
      title={brand.name}
      description={brand.brand_description}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
