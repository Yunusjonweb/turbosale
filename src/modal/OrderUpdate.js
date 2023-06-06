import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export async function OrderUpdate(status, id) {
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));
  const praduct = doc(firestore, `${userEmail.email}.basket`, id);
  await updateDoc(praduct, {
    status: status,
  });
}
