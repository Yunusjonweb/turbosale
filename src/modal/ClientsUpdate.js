import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export async function ClientsUpdate(name, email, phone, id) {
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));
  const praduct = doc(firestore, `${userEmail.email}.clients`, id);
  await updateDoc(praduct, {
    name: name,
    email: email,
    phone: phone,
  });
}
