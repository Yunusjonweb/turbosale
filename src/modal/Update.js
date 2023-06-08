import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export async function UpdateData(
  names,
  price,
  sale,
  quantity,
  textArea,
  file,
  id
) {
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));
  const praduct = doc(firestore, `${userEmail.email}.product`, id);
  await updateDoc(praduct, {
    name: names,
    price: price,
    sale: sale,
    quantity: quantity,
    textArea: textArea,
  });
}
