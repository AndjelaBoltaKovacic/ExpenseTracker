import { Palette, PaletteColor } from "@mui/material/styles";

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
declare module "@mui/material/styles" {
    // these are the extra keys we added to our theme palette if you recall
    // we are telling TS to chill out incase it encounters these keys 
    interface Palette {
        upvote?: PaletteColor;
        downvote?: PaletteColor;
        containerPrimary?: PaletteColor;
        containerSecondary?: PaletteColor;
    }
}


export interface AppTheme {
    dark: {
        palette: DeepPartial<Palette>;
    };
    light: {
        palette: DeepPartial<Palette>;
    };
}

