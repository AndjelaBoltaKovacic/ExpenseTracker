import { useUserContext } from '../../contexts/user.context'
import NoticeCard from './notice-card';
import { _void } from '../../models/common';

function GetStartedCard({ onClick }: { onClick: _void }) {

    const { user } = useUserContext();
    return (
        <NoticeCard
            title={`Welcome, ${user?.firstname}!`}
            text="It seems like you don't have any transactions yet."
            buttonText="Get started"
            onButtonClick={onClick}
        />
    )
}

export default GetStartedCard