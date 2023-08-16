
import { theme as _default } from "./theme";
import { Palette, PaletteColor } from "@mui/material/styles";

// this is a typescript utility, if I say DeepPartial<Object> it means any key of that object, is not reauired.
// this works even when we have nested objects and we want all the keys to be optional. why is this being used?
// I'd recommend you try to omit this at the end of the tutorial to findout the errors you get to understand it's importance
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
    // we need to supply it here too, PaletteOptions are used while supplying theme to the context
    interface PaletteOptions {
        upvote?: PaletteColor;
        downvote?: PaletteColor;
        containerPrimary?: PaletteColor;
        containerSecondary?: PaletteColor;
    }
}
// [IMP] in order to use colour={'upvote'} you need to tell ts this like so:
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        upvote: true;
        downvote: true;
    }
}
// similarly i want to use upvote as a colour in circular progress component as well
declare module "@mui/material/CircularProgress" {
    interface CircularProgressPropsColorOverrides {
        upvote: true;
        downvote: true;
    }
}
// this will be our Theme Type. remember how we created themes earlier? those objects 
// are of type AppTheme, we will add this type to those files
export interface AppTheme {
    dark: {
        palette: DeepPartial<Palette>;
    };
    light: {
        palette: DeepPartial<Palette>;
    };
}
// finally we export a final object that contains all our themes which we can
// use to pick our desired palette.
export const color = {
    0: _default,
};