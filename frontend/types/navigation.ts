// Navigation types for Expo Router
export type RootStackParamList = {
  index: undefined;
  login: undefined;
  register: undefined;
  'forgot-password': undefined;
  'verify-otp': { email: string };
  home: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}