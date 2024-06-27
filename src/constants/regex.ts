class RegexModel {
  password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  letter_regex = /^[a-zA-ZÀ-ÿ\s][a-zA-ZÀ-ÿ\s]*$/;
  validateInputPattern = /^[a-zA-ZÀ-ÿ\s]+$/;
  validateNumber = /^\d+$/;
  validateDateOfBirth = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
}

const regexModel = new RegexModel();
export default regexModel;
