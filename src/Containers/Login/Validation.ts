/* eslint-disable no-useless-escape */

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validatePasswordStrength(password: string) {
  const reg = /^(?=.*?[.'"$+()[/:;#?!@$%^&*-])/;
  return reg.test(password);
}

export function validatePassword(password: string) {
  if (password?.length < 8) {
    return false;
  }
  return true;
}

export function validatePrenom(prenom: any) {
  if (prenom?.length === 0) {
    return false;
  }
  return true;
}
export function validateNom(nom: any) {
  if (nom?.length === 0) {
    return false;
  }
  return true;
}
export function validateCheckbox(checkbox: boolean) {
  if (checkbox) {
    return false;
  }
  return true;
}
export function validateCountry(country: any) {
  if (country?.length !== 0) {
    return true;
  }
  return false;
}
