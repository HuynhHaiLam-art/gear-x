import React, { useEffect } from "react";
import axios from "axios";

const TestApi = () => {
    useEffect(() => {
      axios.get("https://your-ngrok-url.ngrok-free.app/api/User/2", {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        })
        .then(response => console.log("Data:", response.data))
        .catch(error => console.error("Lỗi:", error));
    }, []);
  
    return <div>Kiểm tra console để xem dữ liệu</div>;
  };
  
  export default TestApi;
