import { _void } from "../../models/common"
import NoticeCard from "./notice-card"

const ErrorCard = ({ onClick }: { onClick: _void }) => {
    return (
        <NoticeCard
            title='Opps! Something went wrong!'
            text='Sorry for the inconvenience. Please try again later.'
            buttonText='Retry'
            onButtonClick={() => onClick()}
        />
    )
}

export default ErrorCard