import React from "react";
import "./Signout.css";
import { useNavigate } from "react-router-dom";
import {
  auth,
  doc,
  db,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "./FirebaseConfig";

const Signout = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Query to find the document in the Firestore collection where user data is stored
        const userQuery = query(
          collection(db, "userdata"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          // Assuming there's only one document per email
          const userDoc = querySnapshot.docs[0];
          const userId = userDoc.id;

          // Delete the document from the Firestore collection
          const userRef = doc(db, "userdata", userId);
          await deleteDoc(userRef);
          console.log("User data deleted successfully!");
        } else {
          console.log("No user is currently signed in.");
        }
      }
      // Delete the user account from Firebase Authentication
      await user.delete();
      console.log("User account deleted successfully!");

      // Sign out
      await auth.signOut();
      console.log("Signed out successfully!");
      localStorage.removeItem("sigInEmail");
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out or deleting user data:", error);
    }
  };

  return (
    <div>
      <div className="sign-out-container">
        <h1>Sign Out</h1>
        <br />
        <p>Are you sure you want to sign out?</p>
        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Signout;
