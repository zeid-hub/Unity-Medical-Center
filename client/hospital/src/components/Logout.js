// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Logout.css"

// function Logout() {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await fetch("/logout", {
//         method: "DELETE",
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       // Remove token from local storage
//       localStorage.removeItem("token");
//       // Redirect to login page
//       navigate("/login");
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Logout</h2>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default Logout;




import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css"; // Import your CSS file

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("/logout", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Remove token from local storage
      localStorage.removeItem("token");
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="logout-container"> {/* Add a className attribute */}
      <h2>Logout</h2>
      <button onClick={handleLogout}><span>LOGOUT</span></button>
    </div>
  );
}

export default Logout;
