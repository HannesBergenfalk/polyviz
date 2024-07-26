import { StrictMode } from "react"
import { getFirebase } from "../firebase"
import { collection, doc, setDoc, getDoc } from "firebase/firestore"
import { getCuleMaps } from "../operations"

const Main = () => {
  return (
    <StrictMode>
      <div>Hi</div>
    </StrictMode>
  )
}

export default Main

const testStoreAcccess = async () => {
  const { firestore } = getFirebase()
  const citiesRef = collection(firestore, "cities")

  await setDoc(doc(citiesRef, "SF"), {
    name: "San Francisco",
    state: "CA",
    country: "USA",
    capital: false,
    population: 860000,
    regions: ["west_coast", "norcal"],
  })
  await setDoc(doc(citiesRef, "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
    capital: false,
    population: 3900000,
    regions: ["west_coast", "socal"],
  })
  await setDoc(doc(citiesRef, "DC"), {
    name: "Washington, D.C.",
    state: null,
    country: "USA",
    capital: true,
    population: 680000,
    regions: ["east_coast"],
  })
  await setDoc(doc(citiesRef, "TOK"), {
    name: "Tokyo",
    state: null,
    country: "Japan",
    capital: true,
    population: 9000000,
    regions: ["kanto", "honshu"],
  })
  await setDoc(doc(citiesRef, "BJ"), {
    name: "Beijing",
    state: null,
    country: "China",
    capital: true,
    population: 21500000,
    regions: ["jingjinji", "hebei"],
  })

  const docRef = doc(firestore, "cities", "SF")
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data())
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!")
  }
}

getCuleMaps()
