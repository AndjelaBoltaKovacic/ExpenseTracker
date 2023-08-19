import { Palette } from "@mui/material/styles";

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};


export type AppTheme = {
    dark: {
        palette: DeepPartial<Palette>;
    };
    light: {
        palette: DeepPartial<Palette>;
    };
}

