import { LightTheme } from "../values/enums/colors"
import { Theme } from "../values/enums/theme"

export const getInputLabelColor = (mode: Theme) => {
    return {
        style: { color: mode === Theme.Light ? LightTheme.PrimaryVariant : '' },
    }
}
