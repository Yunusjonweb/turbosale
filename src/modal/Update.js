import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export async function UpdateData(name, price, sale, quantity, textArea, id) {
  console.log(name, price, id);
  const praduct = doc(firestore, "product", id);
  await updateDoc(praduct, {
    name: name,
    price: price,
    sale: sale,
    quantity: quantity,
    textArea: textArea,
  });
}
