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
                    main: LightTheme.PrimaryVariant,
                    contrastText: "#003257",
                },
            }),
            warning: palette.augmentColor({
                color: {
                    main: "#cace09",
                    contrastText: "#313300",
                },
            }),         
        },
    },
    dark: {
        palette: {
            mode: "dark",
            primary: palette.augmentColor({
                color: {
                    main: DarkTheme.Primary,
                    contrastText: DarkTheme.OnPrimary,
                },
            }),
            secondary: palette.augmentColor({
                color: {
                    main: DarkTheme.Secondary,
                    contrastText: DarkTheme.OnSecondary,
                },
            }),
            text: {
                primary: DarkTheme.OnBackground,
                secondary: DarkTheme.OnSurface,
            },
            background: {
                default: DarkTheme.Background,
                paper: DarkTheme.Surface,
            },
            error: palette.augmentColor({
                color: {
                    main: DarkTheme.Error,
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
        },
    },
};