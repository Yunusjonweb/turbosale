import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const initial_values = {
  userData: {
    token: false,
    email: "",
    password: "",
  },
  userInfo: {
    order: [],
    praduct: [],
    slice: [],
    tokenExperentDate: new Date().getTime(),
  },
};

export async function SetNewUser(userData) {
  const { email, password } = userData;
  try {
    const docRef = await setDoc(doc(firestore, "users", email), {
      email: email,
      password: password,
    });
  } catch (err) {
    console.log(err);
  }
}

let currentDate = new Date().getDate();

export const test = (callBack) => {
  const userData = localStorage.getItem("userData");
  if (!userData) {
    callBack("/register");
    window.location.reload();
  } else if (
    userData &&
    JSON.parse(userData).tokenExperentDate > currentDate &&
    JSON.parse(userData).token === true
  ) {
    callBack("/login");
  } else if (userData && JSON.parse(userData).tokenExperentDate < currentDate) {
    callBack("/sidebar");
  } else {
    callBack("/");
  }
};
