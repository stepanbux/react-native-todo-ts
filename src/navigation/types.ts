import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Tab: undefined;
};

export type SignInScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "SignIn">;
};

export type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "SignUp">;
};

export type TabScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Tab">;
};

export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
};
