import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export async function SupplierUpdate(
  supplierName,
  adress,
  product,
  phone,
  quantity,
  id
) {
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));
  const supplier = doc(firestore, `${userEmail.email}.supplier`, id);
  await updateDoc(supplier, {
    supplierName: supplierName,
    adress: adress,
    product: product,
    phone: phone,
    quantity: quantity,
  });
}
