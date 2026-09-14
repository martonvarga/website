export enum CourseType {
  KEDD_PERSONAL_16_00_17_30 = "Kedd 16:00-17:30 Személyes",
  KEDD_ONLINE_18_00_19_30 = "Kedd 18:00-19:30 Online",
  CSUTORTOK_PERSONAL_16_00_17_30 = "Csütörtök 16:00-17:30 Személyes",
  CSUTORTOK_ONLINE_18_00_19_30 = "Csütörtök 18:00-19:30 Online",
  SZOMBAT_PERSONAL_10_00_11_30 = "Szombat 10:00-11:30 Személyes",
  VASARNAP_ONLINE_10_00_11_30 = "Vasárnap 10:00-11:30 Online",
}

export type CourseSignUpFormType = {
  firstName: string;
  lastName: string;
  email: string;
  course: CourseType | "";
};
