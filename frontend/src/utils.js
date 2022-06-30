import jwtDecode from "jwt-decode";
import { DateTimeFormatter } from "@js-joda/core";

const setSelectedUserTypeColor = (typeIndex) => {
  let labels = document.getElementsByClassName("user-type")[0];
  labels.childNodes[typeIndex].style.color = "#64BBEB";
};

const resetSelectedUserTypeColor = (typeIndex) => {
  let labels = document.getElementsByClassName("user-type")[0];
  labels.childNodes[typeIndex].style.color = "#333";
};

export const setUserView = (typeIndex) => {
  document.getElementsByClassName("user-type-slider")[0].value = typeIndex;
  setSelectedUserTypeColor(typeIndex);
  resetSelectedUserTypeColor(Math.abs(typeIndex - 1));
};

export const showError = (error_type) => {
  document.getElementById("error").style.visibility = "visible";
  document.getElementById("error").style.height = "4em";
  switch (error_type) {
    case "NO_CREDENTIALS":
      document.getElementById("error").innerHTML =
        "<b>ERRORE</b>:Indicare username e password";
      console.error(error_type);
      break;
    case "BAD_CREDENTIALS":
      document.getElementById("error").innerHTML =
        "<b>ERRORE</b>:Credenziali errate";
      console.error(error_type);
      break;
    case "USER_ALREADY_EXISTS":
      document.getElementById("error").innerHTML =
        "<b>ERRORE</b>:L'utente esiste già";
      console.error(error_type);
      break;
    default:
      return;
  }

  setTimeout(() => {
    document.getElementById("error").style.visibility = "hidden";
    document.getElementById("error").style.height = "0";
    document.getElementById("error").innerHTML = "";
  }, 5000);
};

export const isRefreshTokenValid = () => {
  const refresh = localStorage.getItem("refresh_token");
  if (refresh !== null) {
    const refreshDecoded = jwtDecode(refresh);
    //console.log(refreshDecoded.exp*1000, " - ", Date.now());
    return refreshDecoded.exp * 1000 > Date.now();
  } else {
    return false;
  }
};

export const setTimeToRefreshToken = (tokenBody) => {
  const iat = tokenBody.iat;
  const exp = tokenBody.exp;
  const timeout = (exp - iat - 10) * 1000;
  //console.log("Timeout set: " + timeout);
  return timeout;
};

export const formatDate = (date) => {
  const LocalDate = require("@js-joda/core").LocalDate;
  const parsedDate = LocalDate.parse(date);
  return parsedDate.format(DateTimeFormatter.ofPattern("d/MM/yyyy"));
};

