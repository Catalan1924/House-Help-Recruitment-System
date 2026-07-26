import { createContext, useContext, useState, useCallback } from "react";

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [data, setData] = useState({
    // Step 1: PersonalInfo
    fullName: "",
    email: "",
    phone: "",
    password: "",
    // Step 2: SelectRole
    role: "", // "worker" or "employer"
    // Step 3: ProfileInfo
    county: "",
    experience: "",
    expectedSalary: "",
    // Step 4: UploadDocuments
    nationalId: null,
    goodConduct: null,
    cv: null,
  });

  const updateData = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetData = useCallback(() => {
    setData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      role: "",
      county: "",
      experience: "",
      expectedSalary: "",
      nationalId: null,
      goodConduct: null,
      cv: null,
    });
  }, []);

  return (
    <RegistrationContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }
  return context;
};
