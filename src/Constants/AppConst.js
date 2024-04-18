import { RFValue } from "react-native-responsive-fontsize";

export const STANDARD_SCREEN_HEIGHT = 740;

export const FONT_BOLD = "Quicksand-Bold";
export const FONT_LIGHT = "Quicksand-Light";
export const FONT_MEDIUM = "Quicksand-Medium";
export const FONT_REGULAR = "Quicksand-Regular";


export const EXTRA_SMALL_FONT_SIZE_2 = 9;
export const EXTRA_SMALL_FONT_SIZE_1 = 10;
export const EXTRA_SMALL_FONT_SIZE = 12;
export const SMALL_FONT_SIZE = 14;
export const NORMAL_FONT_SIZE = 16;
export const LARGE_FONT_SIZE = 18;
export const EXTRA_LARGE_FONT_SIZE = 20;
export const EXTRA_LARGE_FONT_SIZE_2 = 24;
export const EXTRA_LARGE_FONT_SIZE_3 = 26;



export const WHITE_COLOR = "white";
export const BLACK_COLOR = "black";
export const THEME_COLOR = "#147fcd"
export const THEME_COLOR_2 = "#148be2";
export const THEME_COLOR_3 = "#148be2db";
export const backgroundLightColor = '#f0f0f0';
export const LIGHT_GRAY = 'lightgray';


export const UNDERLINE_COLOR = "#c3c3c3";
export const ICON_COLOR = "#c3c3c3";
export const GRAY_COLOR = "#d6d8d7";
export const ORANGE_COLOR = "#bb6a2e";
export const TEXT_GRAY = "#5c5e5c";
export const LOGIN_BTN_COLOR = '#01487f';
export const LOGIN_BTN_COLOR1 = '#024e89';
export const LOGIN_BTN_COLOR_LIGHT = '#035798b0';

export const TOOLBAR_1 = '#178ff4';
export const TOOLBAR_2 = '#10c3bf';
export const DARD_GRAY_1 = '#818181'
export const DARY_GRAY_2 = '#8a8888e0';
export const TRANSPARENT = "transparent";

export const phoneRegExp = '^[0-9]*$'; //'^[6-9]{1}?[0-9]{9}$';
export const userNameRegExp = '^[a-z0-9@.]+([._@][a-z0-9@]+)*$';//'^[a-z]{1}?[a-z0-9_.]*$';
export const coporateRegExp = '^[a-zA-Z0-9]*$';
export const couponeCodeRegExp = '^[a-zA-Z0-9]*$';
export const passwordRegExp = '^[a-zA-Z0-9]{1}?[a-zA-Z0-9_@]*$';
export const onlyWordsWithSpace = '^^[a-zA-Z]{1}?[a-zA-Z ]*$';
export const onlyWords = '^[a-zA-Z]{1}?[a-zA-Z]*$';
export const alphaNumbericRegExp = '^[a-zA-Z0-9]*$';
export const reasonRegExp = '^[a-zA-Z0-9_?., ]*$';
export const ReferenceCodeRegExp = '^[a-zA-Z0-9-]*$';

export const TOOLBAR_HEIGHT = RFValue(60, STANDARD_SCREEN_HEIGHT);


export const API_STATUS = {
    NO_INTERNET: "NO_INTERNET",
    BAD_REQUEST: "BAD_REQUEST",
    SERVER_ERROR: "SERVER_ERROR",
    CODE_ERROR: "CODE_ERROR",
    OK: "OK"
}

export const SURVEY_QUES_TYPE = {
    YES_NO: 'fbd5afa6',
    MULTI_CHOICE: 'dd57541d',
    MULTI_ANSWER: '39080bf1',
    OPEN: '797537f0'
}

export const LOGIN_TYPE = {
    STUDENT: 'Student',
    PARENT: "Parent",
    TRAINER: "Trainer",
    MEMBER: 'Member',
    TEACHER: 'Teacher',
}