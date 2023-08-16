import { createTheme } from "@mui/material/styles";
import { DarkTheme, LightTheme } from '../values/enums/colors';
import { AppTheme } from "../models/theme";


const { palette } = createTheme();

export const theme: AppTheme = {
    light: {
        palette: {
            mode: "light",
            primary: palette.augmentColor({
                color: {
                    main: LightTheme.Primary,
                    contrastText: LightTheme.OnPrimary,
                },
            }),
            secondary: palette.augmentColor({
                color: {

                    main: LightTheme.Secondary,
                    contrastText: LightTheme.OnSecondary,
                },
            }),
            text: {
                // pick the onBackground colour OF DARK and paste it here
                primary: LightTheme.OnBackground,
                // pick the onSurface colour OF DARK and paste it here
                secondary: LightTheme.OnSurface,
            },
            background: {
                // pick the background colour OF DARK and paste it here
                default: LightTheme.Background,
                // pick the surface colour and OF DARK paste it here
                paper: LightTheme.Surface,
            },
            error: palette.augmentColor({
                color: {
                    // pick the error colour OF DARK and paste it here
                    main: LightTheme.Error,
                    // pick the onError colour OF DARK and paste it here
                    contrastText: LightTheme.OnError,
                },
            }),
            success: palette.augmentColor({
                color: {
                    main: "#79dd72",
                    contrastText: "#003a03",
                },
            }),
            info: palette.augmentColor({
                color: {
                    main: "#99cbff",
                    contrastText: "#003257",
                },
            }),
            warning: palette.augmentColor({
                color: {
                    main: "#cace09",
                    contrastText: "#313300",
                },
            }),
            // I put the outline colour here
            divider: "#938f99",
            // important: these are custom variables
            // suppose instead of doing <Button colour={'primary'} /> you want to do something like <Button colour={'upvote'} />
            // for an upvote button? here I am creating custom variabels and supplying colours that I want based on my product design 
            upvote: palette.augmentColor({
                color: {
                    main: "#cdbeff",
                    contrastText: "#32009a",
                },
            }),
            // same as above
            downvote: palette.augmentColor({
                color: {
                    main: "#ffb4a9",
                    contrastText: "#680003",
                },
            }),
            containerPrimary: palette.augmentColor({
                color: {
                    // pick the primary Conatiner colour OF DARK and paste it here 
                    main: "#4b24ba",
                    // pick the On primary Conatiner colour OF DARK and paste it here 
                    contrastText: "#e8deff",
                },
            }),
            containerSecondary: palette.augmentColor({
                color: {
                    // pick the secondary Conatiner colour OF DARK and paste it here 
                    main: "#494458",
                    // pick the On secondary Conatiner colour OF DARK and paste it here 
                    contrastText: "#e7dff8",
                },
            }),
        },
    },
    // REPEAT FOR LIGHT. instead of picking colours from dark palette, pick colours from the light one and repeat as above
    dark: {
        palette: {
            mode: "dark",
            // this method augmentColor creates a MUI colour object, with other values automatically like light and dark
            // as a colour object has main, contrastText, light and dark keys. but we need not provide light and dark keys.
            primary: palette.augmentColor({
                color: {
                    // pick the primary colour OF DARK and paste it here
                    main: DarkTheme.Primary,
                    // pick the onPrimary colour OF DARK and paste it here
                    contrastText: DarkTheme.OnPrimary,
                },
            }),
            secondary: palette.augmentColor({
                color: {
                    // pick the secondary colour OF DARK and paste it here
                    main: DarkTheme.Secondary,
                    // pick the onSecondary colour OF DARK and paste it here
                    contrastText: DarkTheme.OnSecondary,
                },
            }),
            text: {
                // pick the onBackground colour OF DARK and paste it here
                primary: DarkTheme.OnBackground,
                // pick the onSurface colour OF DARK and paste it here
                secondary: DarkTheme.OnSurface,
            },
            background: {
                // pick the background colour OF DARK and paste it here
                default: DarkTheme.Background,
                // pick the surface colour and OF DARK paste it here
                paper: DarkTheme.Surface,
            },
            error: palette.augmentColor({
                color: {
                    // pick the error colour OF DARK and paste it here
                    main: DarkTheme.Error,
                    // pick the onError colour OF DARK and paste it here
                    contrastText: DarkTheme.OnError,
                },
            }),
            success: palette.augmentColor({
                color: {
                    main: "#79dd72",
                    contrastText: "#003a03",
                },
            }),
            info: palette.augmentColor({
                color: {
                    main: "#99cbff",
                    contrastText: "#003257",
                },
            }),
            warning: palette.augmentColor({
                color: {
                    main: "#cace09",
                    contrastText: "#313300",
                },
            }),
            // I put the outline colour here
            divider: "#938f99",
            // important: these are custom variables
            // suppose instead of doing <Button colour={'primary'} /> you want to do something like <Button colour={'upvote'} />
            // for an upvote button? here I am creating custom variabels and supplying colours that I want based on my product design 
            upvote: palette.augmentColor({
                color: {
                    main: "#cdbeff",
                    contrastText: "#32009a",
                },
            }),
            // same as above
            downvote: palette.augmentColor({
                color: {
                    main: "#ffb4a9",
                    contrastText: "#680003",
                },
            }),
            containerPrimary: palette.augmentColor({
                color: {
                    // pick the primary Conatiner colour OF DARK and paste it here 
                    main: "#4b24ba",
                    // pick the On primary Conatiner colour OF DARK and paste it here 
                    contrastText: "#e8deff",
                },
            }),
            containerSecondary: palette.augmentColor({
                color: {
                    // pick the secondary Conatiner colour OF DARK and paste it here 
                    main: "#494458",
                    // pick the On secondary Conatiner colour OF DARK and paste it here 
                    contrastText: "#e7dff8",
                },
            }),
        },
    },
};