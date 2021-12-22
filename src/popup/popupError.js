import Swal from "sweetalert2";

const popupError = (message) => {
  return Swal.fire({
    icon: "error",
    title: "<h3 style='color:#fff'>" + message + "</h3>",
    background: "#FFDB99",
    showConfirmButton: false,
    timer: 1500,
    padding: "1rem 2rem 3rem",
  });
};

export default popupError;
