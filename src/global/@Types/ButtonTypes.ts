import React from "react";

export type CommonButtonType = {
  left_icon?: string;
  right_icon?: string;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  buttonContainerStyle?: string;
  buttonTextStyle?: string;
  leftIconStyle?: string;
  rightIconStyle?: string;
};

export type ToggleButtonType = {
  label?: string;
  left_icon?: string;
  right_icon?: string;
  containerStyle?: string;
  textStyle?: string;
  activeToggleStyle?: string;
  inActiveToggleStyle?: string;
  toggleIndicatorStyle?: string;
  switch_toggle?: boolean;
  isToggle?: boolean[];
  onClick?: () => void;
  isActive: boolean;
};

export interface PrimaryBtnProps {
  btnText: string;
  btnTextClass?: string;
  btnClass?: string;
  img?: string;
  showImg?: boolean;
  imgClass?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  linkTo?: string;
  imgPosition?: "left" | "right";
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}
export interface LinkTextButton {
  btnText: string;
  btnTextClass?: string;
  btnClass?: string;
  img?: string;
  showImg?: boolean;
  imgClass?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  linkTo?: string;
  imgPosition?: "left" | "right";
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}
